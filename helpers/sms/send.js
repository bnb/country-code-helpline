require('dotenv').config()
const sender = process.env.TWILIO_SENDER // Phone number that we're using for this service

// send a text message
async function send (twilio, recipient, message) {
  const options = {
    from: sender,
    to: recipient,
    body: message
  }

  const createMessage = await twilio.messages.create(options)
  return createMessage
}

module.exports = send
