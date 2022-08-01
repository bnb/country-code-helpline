const validateCountryCode = require('../validateCountryCode')
// converts dial codes to country names
async function buildReply (countryCode, entries) {
  const cleanCountryCode = await validateCountryCode(countryCode, 'user')

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

module.exports = buildReply
