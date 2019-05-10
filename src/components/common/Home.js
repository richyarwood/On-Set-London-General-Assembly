// This is the base template
// Components are referenced within this.
// It is a classical component as we need a constructor
// Renders the map and includes the sidebar, add location button, register/login

import React from 'react'
import axios from 'axios'

import Map from './Map'
import LocationIndex from './LocationIndex'
// import LocationShow from './LocationShow'



class Home extends React.Component {

  constructor(){
    super()

    this.state = {
      locations: null
    }
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.error(err))
  } // This creates a 504 error

  render() {
    console.log(this.state.locations, 'the data')
    if (!this.state.locations) return <h1>Loading...</h1>
    return (
      <main>
        <div className="sidebar">
          <LocationIndex data={this.state.locations} />
        </div>
        <div className="map">
          <Map data={this.state.locations}/>
        </div>
      </main>

    )
  }
}

export default Home
