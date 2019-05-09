const mongoose = require('mongoose')

const londonAreas = ['Central London', 'North London', 'North Central London', 'Northeast London', 'Northwest London', 'South London', 'South Central London', 'Southeast London', 'Southwest London', 'East London', 'West London']

const locationSchema = new mongoose.Schema({
  name: {
    unique: 'This location already exists',
    type: String,
    required: 'Please enter a location name'
  },
  image: {
    type: String,
    required: 'Please enter a location name'
  },
  areaOfLondon: {
    type: String,
    required: true,
    enum: londonAreas
  },
  streetAddress: {
    type: String,
    required: 'Please enter a location name'
  },
  postCode: {
    type: String,
    required: 'Please enter a location name'
  },
  coordinates: {
    lat: {
      type: String,
      unique: 'This location already exists'
    },
    long: {
      type: String,
      unique: 'This location already exists'
    }
  },
  films: [{ type: mongoose.Schema.ObjectId, ref: 'Film' }]
})


module.exports = mongoose.model('Location', locationSchema)
