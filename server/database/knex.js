const fs = require('fs-extra');
const config = require('./../config.js');

function initKnex() {
  //delete sqlite file if it exists (mainly for dev purposes);
  if (config.deleteDBonStart && fs.existsSync(config.dbPath)) {
    fs.unlinkSync(config.dbPath);
  }

  return new Promise((res, rej) => {
    //export an instance of the db so other files can access it
    module.exports.db = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: config.dbPath
      },
      useNullAsDefault: true
    })
    res();
  })
}

module.exports = {
  initKnex
}
