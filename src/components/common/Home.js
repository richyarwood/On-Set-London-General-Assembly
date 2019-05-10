// This is the base template
// Components are referenced within this.
// It is a classical component as we need a constructor
// Renders the map and includes the sidebar, add location button, register/login

import React from 'react'
// import axios from 'axios'

import Map from './Map'
import LocationIndex from './LocationIndex'
// import LocationShow from './LocationShow'



class Home extends React.Component {

  constructor(){
    super()

    this.state = {
      data: [],
      locations: [],
      center: {
        lat: -0.070839,
        long: 51.515619
      },
      toggleSidebar: false
    }
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
  }

  toggleSidebarClick(){
    console.log('clicked')
    this.setState({ toggleSidebar: !this.state.toggleSidebar})
  }

  render() {
    return (
      <main>
        <div>
          <div className={`sidebar-wrapper${this.state.toggleSidebar ? ' close': ''}`}>
            <div className="sidebar">
              <LocationIndex />
            </div>
            <div className="togglewrapper">
              <a role="button" className="togglebutton" onClick={this.toggleSidebarClick}>x</a>
            </div>
          </div>
        </div>
        <div className="map">
          <Map />
        </div>
      </main>

    )
  }
}

export default Home
