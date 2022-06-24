import 'dotenv/config'

import { createClient } from 'redis'
import { ApolloServer } from 'apollo-server'

import typeDefs from './schema.js'
import resolvers from './resolvers.js'
import HauntedPlacesDataSource from './data-source.js'


const graphqlPort = Number(process.env.GRAPHQL_PORT ?? 80)
const redisPort = Number(process.env.REDIS_PORT ?? 6379)
const redisHost = process.env.REDIS_HOST ?? 'localhost'

const redis = createClient({ socket : { port: redisPort, host: redisHost }})
redis.on('error', (err) => console.log('Redis Client Error', err))
await redis.connect()

let server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    hauntedPlaces: new HauntedPlacesDataSource(redis)
  })
})

let info = await server.listen({ port: graphqlPort })
console.log(`👻 Server ready at ${info.url} 👻`)


