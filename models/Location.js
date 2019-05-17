const mongoose = require('mongoose')

const areasOfLondon = [
  'Central London',
  'North London',
  'North Central London',
  'Northeast London',
  'Northwest London',
  'South London',
  'South Central London',
  'Southeast London',
  'Southwest London',
  'East London',
  'West London',
  'The City of London'
]

const locationSchema = new mongoose.Schema({
  name: {
    unique: 'This location already exists',
    type: String,
    required: 'Please enter a location name'
  },
  image: {
    type: String,
    required: 'Please enter an image'
  },
  areaOfLondon: {
    type: String,
    required: 'Please select an area of London',
    enum: areasOfLondon
  },
  streetAddress: {
    type: String,
    required: 'Please enter a valid street address'
  },
  postCode: {
    type: String,
    required: 'Please enter postcode'
  },
  coordinates: {
    lat: {
      type: String,
      unique: 'A location with this latitude already exists'
    },
    lng: {
      type: String,
      unique: 'A location with this longitude already exists'
    }
  },
  films: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Film'
  }],
  sceneNotes: [{
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    text: {
      type: String
    },
    film: {
      type: mongoose.Schema.ObjectId,
      ref: 'Film'
    }
  }]
})

module.exports = mongoose.model('Location', locationSchema)
