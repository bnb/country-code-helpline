// description: this code manages generating the Twilio
// MessagingResponse in a modular way, so it can be
// agnostic of wherever it's being used.
require('dotenv').config()
// initialize Twilio
const Twilio = require('twilio')

const MessagingResponse = Twilio.twiml.MessagingResponse // set up MessagingResponse for Twilio

async function buildMessagingResponse (message) {
  const twiml = new MessagingResponse()
  twiml.message(message) // process our message into twiml
  return twiml.toString() // result is the message as a twiml string
}
module.exports = buildMessagingResponse
