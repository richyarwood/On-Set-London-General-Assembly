import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import SecureRoute from './components/common/SecureRoute'

import Home from './components/common/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import EditProfile from './components/auth/EditProfile'

import LocationNew from './components/locations/LocationNew'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimesCircle, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle, faTimesCircle, faExchangeAlt)

import 'bulma'

import './style.scss'

class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>

          <SecureRoute path="/me" component={EditProfile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/new" component={LocationNew} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
