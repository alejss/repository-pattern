const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const router = require('../routes/index')

app.use(bodyParser.json())
app.use(router)

module.exports = app