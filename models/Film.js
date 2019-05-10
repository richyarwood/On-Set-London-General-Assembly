const mongoose = require('mongoose')


const filmSchema = new mongoose.Schema({
  title: {
    unique: 'This film already exists',
    type: String,
    required: 'Please enter a film name'
  }
})

module.exports = mongoose.model('Film', filmSchema)
