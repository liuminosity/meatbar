const knex = require('./knex.js').db;

function getPeople() {
  return knex.select('name').distinct('name').from('Consumption')
    .then((names)=>{
      return names
    })
}

function getConsumption(user) {
  return knex.count().from('Consumption').where({
    name: user
  }).then((count)=>{
    return {
      consumption: count[0]["count(*)"],
      user
    }
  })
}

//TODO: make this its own sql table
const categoryTypes = [
  'beef',
  'bison',
  'lamb'
]

function getGraphData(user) {
  const promisifiedArr = categoryTypes.map((type) => {
    return knex.count().select(['name', 'meat']).from('Consumption').where({
      name: user,
      meat: type
    })
  })
  return Promise.all(promisifiedArr)
  .then((data) =>{
    return data.map((segment) => {
      return {
        quantity: segment[0]["count(*)"],
        type: segment[0].meat
      }
    })
  } )
}

module.exports = {
  getPeople,
  getConsumption,
  getGraphData
}
