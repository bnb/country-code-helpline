// description: fetch data from PlanetScale database and
require('dotenv').config()
const database = process.env.PLANETSCALE_DATABASE_URL
const mysql = require('mysql2/promise') // needed as the JavaScript interface for PlanetScale
const validateCountryCode = require('../data/validateCountryCode')

// this will probably go in an index.js fastify route
async function fetchDataForCountryCode (countryCode) {
  const cleanCountryCode = await validateCountryCode(countryCode, 'code')
  // spin up the database connection
  const connection = await mysql.createConnection(database)

  // query as a variable so we can cleanly keep an eye on it
  const query = 'SELECT * FROM `countries` WHERE `number` = ?' // note that the `?` will be replaced with information passed to connection.execute() as the second parameter
  // fetch data from the database
  const [rows] = await connection.execute(query, [cleanCountryCode])

  await connection.end()
  return rows
}

module.exports = fetchDataForCountryCode
