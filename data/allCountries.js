const countries = require('./raw')

let allCountries = countries

// loop over all of the countries above, restructuring the data to be objects with named keys
for (let i = 0; i < allCountries.length; i++) {
  let country = allCountries[i];
  allCountries[i] = {
    name: country[0],
    iso2: country[1],
    dialCode: country[2],
    priority: country[3] || 0,
    areaCodes: country[4] || null
  }
}

module.exports = allCountries