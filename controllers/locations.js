const Location = require('../models/Location')


// Get all locations ========================
function indexRoute(req, res, next) {
  Location.find()
    .populate('films sceneNotes.film sceneNotes.createdBy filmImage')
    .then(locations => res.json(locations))
    .catch(next)
}

// Find an individual location ===============
function showRoute(req, res, next) {
  Location.findById(req.params.id)
    .populate('films sceneNotes.film sceneNotes.createdBy', '-email')
    .then(location => res.json(location))
    .catch(next)
}


// Create a location =========================
function createRoute(req, res, next) {
  req.body.createdBy = req.currentUser
  req.body.sceneNotes.map(sceneNote => {
    sceneNote.createdBy = req.currentUser
    return sceneNote
  })
  Location.create(req.body)
    .then(location => res.status(201).json(location))
    .catch(next)
}

//Find a individual scene note ================
function showSceneRoute(req, res, next) {
  Location.findById(req.params.id)
    .populate('sceneNotes.film')
    .then(location => {
      const sceneNote = location.sceneNotes.id(req.params.sceneId)
      res.json(sceneNote)
    })
    .catch(next)
}

// Update a scenenote ========================
function updateRoute(req, res, next) {
  Location.findById(req.params.id)
    .then(location => {
      const sceneNote = location.sceneNotes.id(req.params.sceneId)
      sceneNote.set(req.body)
      return location.save()
    })
    .then(location => res.json(location))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  updateScene: updateRoute,
  showScene: showSceneRoute
}
