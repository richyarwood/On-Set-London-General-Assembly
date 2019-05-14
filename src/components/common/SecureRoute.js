import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../../lib/Auth'

// make a `Component` variable containing the component
// make an `otherProps` object containing all the other props
const SecureRoute = ({ component: Component, ...otherProps }) => {

  // if we have a token, return a normal route with Component and the otherProps set
  if(Auth.isAuthenticated()) return <Route {...otherProps} component={Component} />

  return <Redirect to="/login" />
}

export default SecureRoute
