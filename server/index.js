const express = require('express');
const freeport = require('freeport');
const config = require('./config.js');
const path = require('path');

const initKnex = require('./database/knex.js').initKnex;
let db_utils;

const app = express();

app.use('/', express.static(path.join(__dirname, './../frontend/dist')))

app.get('/people', (req, res) => {
  setTimeout(() => {
    db_utils.getPeople()
    .then((people) => {
      res.send(people);
    })
    .catch((e) => {
      res.send(e);
    })

  }, Math.random()*1000)
})

app.get('/bar-types', (req, res) => {
  setTimeout(() => {
    const {user} = req.query;
    db_utils.getGraphData(user)
    .then((data)=> {
      res.send(data)
    })
    .catch((e) => {
      res.send(e);
    })

  }, Math.random()*500)

})

app.get('/consumptions', (req, res) => {
  setTimeout(() => {
    const {user} = req.query;
    db_utils.getConsumption(user)
    .then((count)=> {
      res.send(count)
    })
    .catch((e) => {
      res.send(e);
    })

  }, Math.random()*500)
})

function serverInit() {
  console.log('Server initializing...')
  initKnex().then(()=>{
    require('./database/init').then(()=>{
      db_utils = require('./database/db_utils.js');
      console.log('Database initialized')
      if (config.port) {
        app.listen(config.port)
        console.log(`**Server ready and running on port ${config.port}!**`)
      } else {
        freeport((err, port)=> {
          if (err) throw err
          app.listen(port)
          console.log(`**Server ready running on random free port ${port}!**`)
        })
      }
    })
    
  })
  
}

serverInit();


