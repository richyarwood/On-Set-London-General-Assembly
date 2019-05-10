const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./config/routes')
const { port, dbUri } = require('./config/environment')
const errorHandler = require('./lib/errorHandler')

const app = express()

mongoose.connect(dbUri)
app.use(bodyParser.json())
app.use('/api', routes)
app.use(errorHandler)


app.listen(port, () => console.log(`Listening on port ${port}`))
