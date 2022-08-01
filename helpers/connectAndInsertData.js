// this file connects to our PlanetScale database,
// calls on buildInsertQueries to generate all our
// INSERT INTO queries, and then executes those
// queries on the PlanetScale database.
//
// it's expected that this is run as a once-off
// and not a continual process.

require('dotenv').config()
const database = process.env.PLANETSCALE_DATABASE_URL
const mysql = require('mysql2') // needed as the JavaScript interface for PlanetScale
const buildInsertQueries = require('./database/buildDatabaseQueries')

async function connectAndInsertData () {
  // spin up the database connection
  const connection = await mysql.createConnection(database)
  connection.connect()

  // get our built queries
  const queries = await buildInsertQueries()

  // run the built queries
  for (const query in queries) {
    connection.query(`${queries[query]}`, function (err, results, fields) {
      if (err) console.error(err)
      console.log(results)
      console.log(fields)
    })
  }
}

connectAndInsertData()

// async function getDataFromDatabase () {
//   connection.query('SELECT * FROM countries', function (err, rows, fields) {
//   })
// }
