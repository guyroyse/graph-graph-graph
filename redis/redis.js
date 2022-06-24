import { createClient } from 'redis'

const redisPort = Number(process.env.REDIS_PORT ?? 6379)
const redisHost = process.env.REDIS_HOST ?? 'localhost'

const redis = createClient({ socket : { port: redisPort, host: redisHost }})
redis.on('error', (err) => console.log('Redis Client Error', err))
await redis.connect()

export async function querySingle(key, query) {
  const data = await queryMany(key, query)
  return data[0] ?? null
}

export async function queryMany(key, query) {
  const { headers, data } = await redis.graph.query(key, query)

  return data.map(row => {
    return row.reduce((result, value, index) => {
      const name = headers[index]
      result[name] = value
      return result
    }, {})
  })
}
