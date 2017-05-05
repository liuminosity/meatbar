const consumptionData = require('./data/raw.json')
const knex = require('./knex.js').db;

//creates consumption table with schema:
// - id
// - name (string)
// - meat (string)
// - time (timestamp)
function createConsumptionTable() {
  return knex.schema.createTableIfNotExists('Consumption', (table) => {
    table.increments(); //primary
    table.string('name');
    table.string('meat');
    table.timestamp('time');
  })
}

function populateConsumptionTable() {
  return knex.batchInsert('Consumption', consumptionData)
    .then(console.log('Consumption data added'));
}

module.exports = new Promise((res, rej) => {
  createConsumptionTable()
  .then(populateConsumptionTable)
  .then(res)
})

