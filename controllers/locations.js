const Location = require('../models/Location')

function indexRoute(req, res, next) {
  Location.find()
    .then(locations => res.json(locations))
    .catch(next)
}

function showRoute(req, res, next) {
  Location.findById(req.params.id)
    .then(location => res.json(location))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
