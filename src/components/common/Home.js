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

    this.state = {
      data: [],
      center: {
        lat: -0.070839,
        long: 51.515619
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    const data = e.target.id.split(',')
    this.setState( { center: { lat: data[0], long: data[1] } } )
  }

  componentDidMount() {
    axios('/locations')
      .then(res => this.setState({ locations: res.data }))
  }

  render() {
    console.log(this.state.data)
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
