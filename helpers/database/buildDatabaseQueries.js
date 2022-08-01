const dialCodes = require('../data/dialCodes') // pull in our required dial codes information

async function buildInsertQueries () {
  const queries = []
  for (const entry in dialCodes) {
    for (const instance in dialCodes[entry]) {
      const query = `INSERT INTO countries (number, name, shortcode) VALUES ('${entry}', '${dialCodes[entry][instance].name}', '${dialCodes[entry][instance].iso2}');`
      queries.push(query)
    }
  }

  return queries
}

module.exports = buildInsertQueries
