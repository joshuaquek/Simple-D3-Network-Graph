require('dotenv').config() // allows usage of `.env` file

const Promise = require('bluebird')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev')) // Log Requests

app.use('/', express.static(path.join(__dirname, 'client')));

// ------ API ENDPOINTS ------
app.get('/status', (req, res) => {
  res.json( {status: "Server is online."} )
})

app.get('/data', (req, res) => {
  let data = require('./server/datasource/mockdata.json') // REPLACE THIS WITH AN API CALL TO THE REAL DATA (create another function elsewhere and use async await & promises)
  res.json(data)
})

app.listen( process.env.PORT || 4000 ); 