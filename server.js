import 'dotenv/config'

import { ApolloServer } from 'apollo-server'

import typeDefs from './apollo/schema.js'
import resolvers from './apollo/resolvers.js'
import HauntedPlacesDataSource from './apollo/data-source.js'

const graphqlPort = Number(process.env.GRAPHQL_PORT ?? 80)

let server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    hauntedPlaces: new HauntedPlacesDataSource()
  })
})

let info = await server.listen({ port: graphqlPort })
console.log(`👻 Server ready at ${info.url} 👻`)


