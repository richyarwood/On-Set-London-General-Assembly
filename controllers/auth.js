const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function registerRoute(req, res) {
  User.create(req.body)
    .then(() => res.status(201).json({ message: 'Registration successful' }))
    .catch(err => res.json(err))
}

function loginRoute(req, res) {
  // find the user by their email address
  User.findOne({ email: req.body.email })
    .then(user => {
      // check their password is valid
      if(!user || !user.isPasswordValid(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      // create a token
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      // send it to the client
      res.json({ message: `Welcome back, ${user.username}!`, token })
    })
    .catch(err => res.json(err))
}

module.exports = {
  register: registerRoute,
  login: loginRoute
}
