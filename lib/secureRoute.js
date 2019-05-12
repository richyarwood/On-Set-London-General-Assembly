const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secret } = require('../config/environment')

function secureRoute(req, res, next) {
  // check for an Authorization header
  if(!req.headers.authorization || !req.headers.authorization.match(/Bearer .+/)) {
    return res.status(401).json({ message: 'Invalid Authorization header' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    // if token is invalid
    if(err) return res.status(401).json({ message: err.message })

    // token must be fine...
    User.findById(payload.sub)
      .then(user => {
        if(!user) return res.status(401).json({ message: 'User no longer exists' })
        // this is the user that the token refers to...
        req.currentUser = user // storing the user on the `req` object for later...
        next()
      })
      .catch(() => res.status(401).json({ message: 'Invalid token' }))
  })
}

module.exports = secureRoute
