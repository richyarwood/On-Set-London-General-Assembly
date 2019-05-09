const Film = require('../models/Film')

function indexRoute(req, res, next) {
  Film.find()
    .then(films => res.json(films))
    .catch(next)
}

module.exports = {
  index: indexRoute
}
