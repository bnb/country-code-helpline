// description: this code is indeded to directly take user input *and*
// database rows and generate the appropriate response from that infomration.

const validateCountryCode = require('../data/validateCountryCode')
// converts dial codes to country names
async function buildHumanReadableMessage (countryCode, entries) {
  const cleanCountryCode = await validateCountryCode(0, 'user')

  if (cleanCountryCode !== countryCode) {
    return cleanCountryCode
  } else {
    const names = []

    for (const entry of entries) {
      names.push(entry.name)
    }

    return `Locations that use +${cleanCountryCode}:\n\n${names.join(', ')}`
  }
}

module.exports = buildHumanReadableMessage
