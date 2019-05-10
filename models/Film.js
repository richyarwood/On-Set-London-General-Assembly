const mongoose = require('mongoose')


const filmSchema = new mongoose.Schema({
  title: {
    unique: 'This film already exists',
    type: String,
    required: 'Please enter a film name'
  }
}, {
  toJSON: {
    virtuals: true
  }
})

filmSchema.virtual('sceneNotes', {
  localField: '_id',
  foreignField: 'film',
  ref: 'Location'
})


module.exports = mongoose.model('Film', filmSchema)


// set default Object ID, have two different seed moments?
// Already tried: map with mongoose map, set default location

// sceneNotes check image on slack,virtual schema on the locations with reference in film
// location in film



// [{
//   text: {
//     type: String
//   },
//   location: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Location'
//   }
// }]

//
//
// validate: function() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       this.type = mongoose.Schema.ObjectId
//       if (typeof this.location !== typeof 'object') resolve(true)
//     }, 15)
//     reject()
//   })
// },
