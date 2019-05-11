import React from 'react'

import Auth from '../../lib/Auth'
import { Link, withRouter } from 'react-router-dom'

class LoginLogout extends React.Component{

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  render(){
    return(
      <div>
        {!Auth.isAuthenticated() && <Link to='/login'><button className="button is-normal login">
          Login
        </button></Link>}
        {Auth.isAuthenticated() && <div>
          <button className="button is-normal logout" onClick={this.logout}>
            Logout
          </button>
        </div>}
      </div>

    )
  }
}

export default withRouter(LoginLogout)
