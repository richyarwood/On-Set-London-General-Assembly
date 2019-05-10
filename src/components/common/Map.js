import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_TOKEN
})

class LocationIndex extends React.Component {

  constructor(){
    super()

    this.state = {
      data: [],
      locations: [],
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
    return (
      <div className="location">
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
        <div className="map-plus-icon">
          <FontAwesomeIcon icon="plus-circle" size="4x"/>
        </div>
      </div>
    )
  }
}

export default LocationIndex
