const Location = require('../models/Location')

function indexRoute(req, res, next) {
  Location.find()
    .populate('films sceneNotes.film sceneNotes.createdBy')
    .then(locations => res.json(locations))
    .catch(next)
}

function showRoute(req, res, next) {
  Location.findById(req.params.id)
    .populate('films sceneNotes.film sceneNotes.createdBy', '-email')
    .then(location => res.json(location))
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.createdBy = req.currentUser
  Location.create(req.body)
    .then(() => res.status(201).json({message: 'New location created'}))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
}
