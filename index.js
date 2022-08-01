require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN // Your Auth Token from www.twilio.com/console

const dialCodeToCountryNames = require('./helpers/dialCodeToCountryNames') // converts dialCodes to readable strings of names
const send = require('./helpers/send')

// initialize Fastify
const Fastify = require('fastify')
const fastify = Fastify({
  logger: true
})

fastify.register(require('@fastify/formbody')) // allow Fastify to parse application/x-www-form-urlencoded, which is what Twilio uses for TwiML webhooks

// initialize Twilio
const Twilio = require('twilio')
const twilio = Twilio(accountSid, authToken, {
  lazyLoading: true,
  logLevel: 'debug'
})

const MessagingResponse = Twilio.twiml.MessagingResponse // set up MessagingResponse for Twilio

fastify.get('/', function (request, reply) {
  reply.send('Service is up and running!')
})

fastify.get('/sms', function (request, reply) {
  const twiml = new MessagingResponse()
  twiml.message('hello ^-^')
  reply.code(200)
  reply.header('Content-Type', 'text/xml')
  reply.send(twiml.toString())
})

fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exitCode(1)
  }

  console.log(`Server is now listening on ${address}`)
})
