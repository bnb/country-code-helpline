const countries = require('../../data/raw')

const allCountries = countries
const dialCodes = {}

// loop over all of the countries, restructuring the data to be objects with named keys
for (let i = 0; i < allCountries.length; i++) {
  const country = allCountries[i]
  if (!dialCodes[country[2]]) { // if this is the first time we're encountering the country code (country[2] is the country code)
    dialCodes[country[2]] = []
  }

  dialCodes[country[2]].push({
    name: country[0],
    iso2: country[1]
  })
}

module.exports = dialCodes
