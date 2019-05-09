import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/common/Home'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
