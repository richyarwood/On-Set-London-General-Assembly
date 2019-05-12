import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Map from './Map'
import LocationIndex from './LocationIndex'
import LoginLogout from './LoginLogout'

class Home extends React.Component {

  constructor(){
    super()

    this.state = {
      locations: null,
      center: {
        lat: 51.520119,
        long: -0.098549
      },
      toggleSidebar: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.error(err))
  }

  handleClick(e){
    const lat = e.target.dataset.lat
    const long = e.target.dataset.long
    this.setState( { center: { lat: lat, long: long } } )
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
  }

  toggleSidebarClick(){
    console.log('clicked')
    this.setState({ toggleSidebar: !this.state.toggleSidebar})
  }

  render() {
    if (!this.state.locations) return <h1>Loading...</h1>
    return (
      <main>
        <div>
          <div className={`sidebar-wrapper${this.state.toggleSidebar ? ' close': ''}`}>
            <div className="sidebar">
              <img src="../../images/on-set-london-logo.jpg" alt="On Set London movie Location database" />
              <hr />
              <LocationIndex data={this.state.locations} handleClick={this.handleClick} />
            </div>
            <div className="togglewrapper">
              <a role="button" className="togglebutton" onClick={this.toggleSidebarClick}>x</a>
            </div>
          </div>
        </div>
        <div className="map">
          <Map data={this.state} />
        </div>
        <Link to="/new"><div className="map-plus-icon">
          <FontAwesomeIcon icon="plus-circle" size="4x"/>
        </div></Link>
        <LoginLogout />
      </main>

    )
  }
}

export default Home
