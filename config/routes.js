const router = require('express').Router()

const locationsController = require('../controllers/locations')
const filmsController = require('../controllers/films')
const authenticationController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res) => res.json({ message: 'Welcome to On Set London' }))

router.get('/locations', locationsController.index)
router.get('/locations/:id', locationsController.show)
router.post('/locations', secureRoute, locationsController.create)

router.get('/locations/:id/scenenotes/:sceneId', locationsController.showScene)
router.put('/locations/:id/scenenotes/:sceneId', locationsController.updateScene)

router.get('/films', filmsController.index)
router.get('/films/:id', filmsController.show)
router.post('/films', secureRoute, filmsController.create)
router.put('/films/:id', secureRoute, filmsController.update)

router.post('/register', authenticationController.register)
router.post('/login', authenticationController.login)
router.get('/me', secureRoute, authenticationController.profile)

module.exports = router
