import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_TOKEN
})

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      center: this.props.data.center,
      marker: undefined
    }

    this.popUpShow = this.popUpShow.bind(this)
  }

  popUpShow(e){
    this.setState({marker: {
      lat: e.target.dataset.lat,
      long: e.target.dataset.long,
      image: e.target.dataset.image,
      name: e.target.dataset.name,
      address: e.target.dataset.address
    }})
  }

  render() {
    if (!this.props.data) return <h1>Loading...</h1>
    console.log(this.state.popUpShow)
    console.log(this.state.marker)
    return (
      <div className="location">
        <Map
          style='mapbox://styles/mapbox/streets-v9'
          center = {[ this.props.data.center.long, this.props.data.center.lat ]}
          zoom = {[14]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>

          {this.props.data.locations.map(marker =>
            <Marker key={marker._id}
              coordinates={[marker.coordinates.long, marker.coordinates.lat]}
              anchor="bottom">
              <img src='https://i.pinimg.com/originals/30/98/49/309849c5815761081926477e5e872f1e.png' width='30px' onMouseOver={this.popUpShow}
                data-lat={marker.coordinates.lat}
                data-long={marker.coordinates.long}
                data-image={marker.image}
                data-name={marker.name}
                data-address={marker.streetAddress}
              />
            </Marker>
          )}

          {this.state.marker && <Popup
            coordinates={[this.state.marker.lat, this.state.marker.long]}
            assName="marker-popup"
            offset={{
              'bottom-left': [20, -38],  'bottom': [0, -38], 'bottom-right': [-20, -38]
            }}>
            <div className="marker-popup-content">
              <img src={this.state.marker.image} alt={this.state.marker.name}/>
              <div>
                <div><strong>{this.state.marker.name}</strong></div>
                <div>{this.state.marker.address}</div>
              </div>
            </div>
          </Popup>}

        </Map>
        <div className="map-plus-icon">
          <FontAwesomeIcon icon="plus-circle" size="4x"/>
        </div>
      </div>
    )
  }
}

export default LocationIndex
