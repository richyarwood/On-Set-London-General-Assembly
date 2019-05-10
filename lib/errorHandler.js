function errorHandler(err, req, res, next) {

  // set some reasonable defaults
  let status = 500
  let message = err.message || 'Internal server error'
  let errors = null

  // tidy up the validation error from mongoose
  if(err.name === 'ValidationError') {
    status = 422
    errors = {}
    message = 'Validation failed'
    for(const field in err.errors) {
      errors[field] = err.errors[field].message
    }
  }

  // send the response
  res.status(status).json({ message, errors })
  next(err)

}

module.exports = errorHandler
