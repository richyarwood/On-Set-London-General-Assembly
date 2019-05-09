// This is the base template
// Components are referenced within this.
// It is a classical component as we need a constructor
// Renders the map and includes the sidebar, add location button, register/login

import React from 'react'
// import axios from 'axios'

import Map from './Map'
// import LocationIndex from './LocationIndex'
import LocationShow from './LocationIndex'



class Home extends React.Component{

  constructor(){
    super()
  }

  // componentDidMount() {
  //   axios('/api/locations')
  //     .then(res => this.setState({ locations: res.data }))
  // } // This creates a 504 error

  render() {
    return (
      <main>
        <div className="sidebar">
          <LocationShow />
        </div>
        <div className="map">
          <Map />
        </div>
      </main>

    )
  }
}

export default Home
