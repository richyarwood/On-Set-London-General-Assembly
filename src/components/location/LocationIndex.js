import React from 'react'

import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_TOKEN
})

const LocationIndex = () => {
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
  </div>
}

export default LocationIndex
