const mongoose = require('mongoose')


const sceneNotesSchema = new mongoose.Schema({
  text: {
    type: String
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Location'
  },
  film: {
    type: mongoose.Schema.ObjectId,
    ref: 'Film'
  }
})


module.exports = mongoose.model('sceneNotes', sceneNotesSchema)
