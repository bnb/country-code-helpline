// send a text message
async function send(recipient, message) { 
  const options = {
    from: sender,
    to: recipient,
    body: message
  }

  const createMessage = await twilio.messages.create(options)
}

module.exports = send