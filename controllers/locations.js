const Location = require('../models/Location')

function indexRoute(req, res) {
  Location.find()
    .then(locations => res.json(locations))
    .catch(() => res.status(500).json({ message: 'Server error'}))
}

function showRoute(req, res) {
  Location.findById(req.params.id)
    .then(location => res.json(location))
    .catch(() => res.status(404).json({ message: 'Location does not exist'}))
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
