const Location = require('../models/Location')

function indexRoute(req, res, err) {
  Location.find()
    .then(locations => res.json(locations))
    .catch(console.log(err))
}

function showRoute(req, res, err) {
  Location.findById(req.params.id)
    .then(location => res.json(location))
    .catch(console.log(err))
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
