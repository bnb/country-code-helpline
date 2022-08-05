require('dotenv').config()
const buildMessagingResponse = require('./helpers/sms/buildMessagingResponse') // small helper to automatically build TwiML responses
const validateCountryCode = require('./helpers/data/validateCountryCode') // small helper to validate inputs as country codes
const fetchDataForCountryCode = require('./helpers/database/fetchDataForCountryCode')
const buildHumanReadableMessage = require('./helpers/sms/buildHumanReadableMessage')
// initialize Fastify
const Fastify = require('fastify')
const fastify = Fastify({
  logger: true
})

fastify.register(require('@fastify/formbody')) // allow Fastify to parse application/x-www-form-urlencoded, which is what Twilio uses for TwiML webhooks

fastify.get('/', function (request, reply) {
  reply.send('Service is up and running!')
})

fastify.post('/sms', async function (request, reply) {
  if(request.body.Body) {
    const validatedCountryCode = validateCountryCode(request.body.Body, "user")
    const strippedBody = request.body.Body.replace('+', '')
  
    if(validatedCountryCode === strippedBody) {
      const data = fetchDataForCountryCode(validatedCountryCode)
      const message = buildHumanReadableMessage(data)
      const response = await buildMessagingResponse(message)
      reply.code(200)
      reply.header('Content-Type', 'text/xml')
      reply.send(response)
    } else {
      const response = await buildMessagingResponse(`Oop, it looks like ${request.body.Body} is something other than a valid country code (or we messed up). Try again, maybe?`)
      reply.code(200)
      reply.header('Content-Type', 'text/xml')
      reply.send(response)
    }
  } else {
    reply.code(200)
    reply.header('Content-Type', 'text/xml')
    reply.send(`Missing 'Body' on the reply to the server.`)
  }

})

fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exitCode(1)
  }

  console.log(`Server is now listening on ${address}`)
})
