import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const mapBoxToken = process.env.MAPBOX_API_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapBoxToken
})

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      marker: {},
      markerClick: false
    }

    this.popUpShow = this.popUpShow.bind(this)
    this.popUpHide = this.popUpHide.bind(this)
  }

  popUpShow(e){
    this.props.data.center.lat = e.target.dataset.lat
    this.props.data.center.long = e.target.dataset.long

    this.setState({ markerClick: !this.state.markerClick })
    this.setState({ marker: {
      lat: e.target.dataset.lat,
      long: e.target.dataset.long,
      image: e.target.dataset.image,
      name: e.target.dataset.name,
      address: e.target.dataset.address,
      films: e.target.dataset.films
    }})
  }

  popUpHide(){
    this.setState({ markerClick: false})
  }
  getFilms(films){
    const allFilms = films.map(film => film.title)
    return allFilms.slice(0,1)
  }

  render() {
    if (!this.props.data) return <h1>Loading...</h1>
    return (
      <div className="location">
        <Map
          style='mapbox://styles/mapbox/streets-v10'
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
              <img src='/images/marker-icon.png' width='30px' onClick={this.popUpShow}
                data-lat={marker.coordinates.lat}
                data-long={marker.coordinates.long}
                data-image={marker.image}
                data-name={marker.name}
                data-address={marker.streetAddress}
                data-films={this.getFilms(marker.films)}
              />
            </Marker>
          )}

          {this.state.markerClick && <Popup
            coordinates={[this.state.marker.long, this.state.marker.lat]}
            assName="marker-popup"
            offset={{
              'bottom-left': [20, -38],  'bottom': [0, -38], 'bottom-right': [-20, -38]
            }}>
            <div className="marker-popup-content">

              <img src={this.state.marker.image} alt={this.state.marker.name}/>
              <div>
                <div className="pop-up-title is-size-6"><strong>{this.state.marker.name}</strong></div>
                <div className="pop-up-films"><strong>Films: </strong>
                  {this.state.marker.films}
                </div>
              </div>

            </div>
          </Popup>}

        </Map>
      </div>
    )
  }
}

export default LocationIndex
