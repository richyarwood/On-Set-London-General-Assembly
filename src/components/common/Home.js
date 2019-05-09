// This is the base template
// Components are referenced within this.
// It is a classical component as we need a constructor
// Renders the map and includes the sidebar, add location button, register/login

import React from 'react'

import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

import SideBar from './SideBar'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_TOKEN
})

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

  render() {
    console.log(this.state.data)
    return (
      <main>
        <div className="sidebar">
          <SideBar />
        </div>
        <Map
          style='mapbox://styles/mapbox/streets-v9'
          center = {[ this.state.center.lat, this.state.center.long ]}
          zoom = {[14]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>

          {this.state.data.map(marker =>
            <Marker key={marker.id}
              coordinates={[marker.coordinates.lat, marker.coordinates.long]}
              anchor="bottom">
              <img src='https://i.pinimg.com/originals/30/98/49/309849c5815761081926477e5e872f1e.png' width='30px'/>
            </Marker>
          )}

        </Map>
      </main>

    )
  }
}

export default Home
