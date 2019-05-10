const Location = require('../models/Location')
require('../models/Film')

function indexRoute(req, res, err) {
  Location.find()
    .populate('films sceneNotes.film')
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
