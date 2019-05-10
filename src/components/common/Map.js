import React from 'react'

import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_TOKEN
})

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      center: {
        lat: -0.070839,
        long: 51.515619
      }
    }
  }

  render() {
    // if(this.state.locations[0]) console.log('locations MAP', this.state.locations[0].coordinates)
    console.log('MAP props', this.props)
    if (!this.props.locations) return <h1>Loading...</h1>
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

          {this.props.data.locations.map(marker =>
            <Marker key={marker._id}
              coordinates={[marker.coordinates.lat, marker.coordinates.long]}
              anchor="bottom">
              <img src='https://i.pinimg.com/originals/30/98/49/309849c5815761081926477e5e872f1e.png' width='30px'/>
            </Marker>
          )}
        </Map>
      </div>
    )
  }
}

export default LocationIndex
