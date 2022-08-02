require('dotenv').config()
const database = process.env.PLANETSCALE_DATABASE_URL
const mysql = require('mysql2') // needed as the JavaScript interface for PlanetScale
const buildReply = require('./sms/buildReply')
const validateCountryCode = require('./validateCountryCode')

// this will probably go in an index.js fastify route
async function fetchDataForCountryCode (countryCode) {
  const cleanCountryCode = await validateCountryCode(countryCode, 'code')
  // spin up the database connection
  const connection = await mysql.createConnection(database)
  connection.connect()

  connection.execute('SELECT * FROM `countries` WHERE `number` = ?', [cleanCountryCode], async function (err, results, fields) {
    if (err) throw err
    if(results.length === 0) {
      const countryCodeWithNoCountries = 'The country code you have submitted is associated with no countries.'
      console.log(countryCodeWithNoCountries)
    } else {
      console.log(await buildReply(cleanCountryCode, results))
    }
  })

  connection.end()
}

fetchDataForCountryCode('999')