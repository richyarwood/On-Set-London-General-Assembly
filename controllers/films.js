const Film = require('../models/Film')

function indexRoute(req, res) {
  Film.find()
    .then(locations => res.json(locations))
    .catch(() => res.status(500).json({ message: 'Server error'}))
}

function showRoute(req, res) {
  Film.findById(req.params.id)
    .then(location => res.json(location))
    .catch(() => res.status(404).json({ message: 'Film does not exist'}))
}

function createRoute(req, res) {
  req.body.createdBy = req.currentUser
  Film.create(req.body)
    .then(location => res.status(201).json(location))
    .catch(err => res.json(err))
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
}
