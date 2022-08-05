// description: a file that converts raw data into objects with named keys.
// also largely lifted from the original source that ../../data/raw.js was lifted from.
const countries = require('../../data/raw')

const allCountries = countries

// loop over all of the countries above, restructuring the data to be objects with named keys
for (let i = 0; i < allCountries.length; i++) {
  const country = allCountries[i]
  allCountries[i] = {
    name: country[0],
    iso2: country[1],
    dialCode: country[2],
    priority: country[3] || 0,
    areaCodes: country[4] || null
  }
}

module.exports = allCountries
