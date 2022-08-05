require('dotenv').config()
const buildMessagingResponse = require('./helpers/database/') // small helper to automatically build TwiML responses

// initialize Fastify
const Fastify = require('fastify')
const fastify = Fastify({
  logger: true
})

fastify.register(require('@fastify/formbody')) // allow Fastify to parse application/x-www-form-urlencoded, which is what Twilio uses for TwiML webhooks

fastify.get('/', function (request, reply) {
  reply.send('Service is up and running!')
})

fastify.post('/sms', function (request, reply) {
  const response = buildMessagingResponse('hello ^-^')
  reply.code(200)
  reply.header('Content-Type', 'text/xml')
  reply.send(response)
})

fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exitCode(1)
  }

  console.log(`Server is now listening on ${address}`)
})
