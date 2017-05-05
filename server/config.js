module.exports = {
  port: 3000, //set to null to automatically find a free port
  deleteDBonStart: true, //deletes and create a clean copy of the db on server start. Used mainly for dev purposes
  dbPath: './consumption.sqlite', //path of sqlite file
}
