// description: this code is indeded to directly take user input *and*
// database rows and generate the appropriate response from that infomration.

const validateCountryCode = require('../data/validateCountryCode')
// converts dial codes to country names
async function buildHumanReadableMessage (countryCode, entries) {
  const cleanCountryCode = await validateCountryCode(countryCode, 'user')

  if (cleanCountryCode !== countryCode) {
    return cleanCountryCode
  } else {
    const names = []

    for (const entry of entries) {
      names.push(entry.name)
    }

    if (names.length !== 0) {
      return `Locations that use +${cleanCountryCode}:\n\n${names.join(', ')}`
    } else {
      return `Hmm. It seems that there aren't any locations that use +${cleanCountryCode}!\n\nIf that doesn't seem right to you, please feel free to open an issue and let us know: https://github.com/bnb/country-code-helpline`
    }
  }
}

module.exports = buildHumanReadableMessage
