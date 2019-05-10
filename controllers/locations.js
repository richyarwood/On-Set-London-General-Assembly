const Location = require('../models/Location')

function indexRoute(req, res) {
  Location.find()
    .populate('films sceneNotes.film')
    .then(locations => res.json(locations))
    .catch(() => res.status(500).json({ message: 'Server error'}))
}

function showRoute(req, res) {
  Location.findById(req.params.id)
    .then(location => res.json(location))
    .catch(() => res.status(404).json({ message: 'Location does not exist'}))
}

function createRoute(req, res) {
  req.body.createdBy = req.currentUser
  Location.create(req.body)
    .then(location => res.status(201).json(location))
    .catch(err => res.json(err))
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
}
