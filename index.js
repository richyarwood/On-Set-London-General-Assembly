const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/on-set-london')

app.listen(4000, () => console.log('Listening on port 4000'))
