// This is the base template
// Components are referenced within this.
// It is a classical component as we need a constructor
// Renders the map and includes the sidebar, add location button, register/login

import React from 'react'
import axios from 'axios'

import SideBar from './SideBar'
import LocationIndex from '../location/LocationIndex'



class Home extends React.Component{

  constructor(){
    super()
  }

  componentDidMount() {
    axios('/api/locations')
      .then(res => this.setState({ locations: res.data }))
  } 

  render() {
    return (
      <main>
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="map">
          <LocationIndex />
        </div>
      </main>

    )
  }
}

export default Home
