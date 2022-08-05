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
  if (request.body.Body) {
    const strippedBody = request.body.Body.replace('+', '')
    let resposne = {
      message: '',
      statusCode: 0
    }

    if ((strippedBody === 'help') || (strippedBody === 'Help')) {
      const message = 'Hello! This is the Country Code Helpline. You can text us any number and we will respond with all countries that are associated with that number as a country code. Try it!'
      response.message = await buildMessagingResponse(message)
      response.statusCode = 200
    } else {
      const validated = await validateCountryCode(strippedBody, 'user')
      if (validated === strippedBody) {
        const data = await fetchDataForCountryCode(validated)
        const message = await buildHumanReadableMessage(validated, data)
        response.message = await buildMessagingResponse(message)
        response.statusCode = 200
      } else {
        const message = `Oop, it looks like ${request.body.Body} is something other than a valid country code (or we messed up). Try again, maybe?`
        response.message = await buildMessagingResponse(message)
        response.statusCode = 200
      }
    }
  } else {
    const message = 'Missing \'Body\' on the reply to the server.'
    resposne.message = await buildMessagingResponse(message)
    resposne.statusCode = 406
  }

  reply.code(response.statusCode)
  reply.header('Content-Type', 'text/xml')
  reply.send(response.message)
})

fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  console.log(`Server is now listening on ${address}`)
})
