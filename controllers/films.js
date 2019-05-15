const Film = require('../models/Film')

function indexRoute(req, res, next) {
  Film.find()
    .then(locations => res.json(locations))
    .catch(next)
}

function showRoute(req, res, next) {
  Film.findById(req.params.id)
    .then(location => res.json(location))
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.createdBy = req.currentUser
  Film.create(req.body)
    .then(location => res.status(201).json(location))
    .catch(next)
}

function updateRoute(req, res, next){
  req.body.modifiedBy = req.currentUser
  Film.findById(req.params.id)
    .then(film => film.set(req.body))
    .then(film => film.save())
    .then(film => res.json(film))
    .catch(next)
}
module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute
}
