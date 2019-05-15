import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const mapBoxToken = process.env.MAPBOX_API_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapBoxToken
})

class MapShow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      marker: {},
      markerClick: false
    }

    this.popUpShow = this.popUpShow.bind(this)
    this.popUpHide = this.popUpHide.bind(this)
  }

  popUpShow(marker){
    this.setState({ marker, markerClick: !this.state.markerClick })
  }

  popUpHide(){
    this.setState({ markerClick: false})
  }
  getFilms(films){
    return films.map(film => film.title).slice(0,2)
  }

  render() {
    console.log(this.state.marker)
    if (!this.props.data) return <h1>Loading...</h1>
    return (
      <div className="location">
        <Map
          style='mapbox://styles/mapbox/streets-v10'
          center={this.props.data.center}
          zoom={[15]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>

          {this.props.data.locations.map(marker =>
            <Marker key={marker._id}
              coordinates={[marker.coordinates.lng, marker.coordinates.lat]}
              anchor="bottom">
              <img
                src={this.props.data.center.lat === marker.coordinates.lat ? '/images/active-marker.png': '/images/marker-icon.png'}
                onClick={() => this.popUpShow(marker)}
                className= {this.props.data.center.lat === marker.coordinates.lat ? 'active-marker': 'marker'}
              />
            </Marker>
          )}

          {this.state.markerClick &&
            <Popup
              coordinates={[
                this.state.marker.coordinates.lng,
                this.state.marker.coordinates.lat
              ]}
              onClick={() =>{
                this.props.scrollLocationOnMarkerClick(this.state.marker._id)
                if (this.props.data.toggleSidebar) {
                  this.props.toggleSidebarClick()
                }
              }}
              className="marker-popup"
              offset={{
                'bottom-left': [20, -38],
                'bottom': [0, -38],
                'bottom-right': [-20, -38]
              }}
            >
              <div className="marker-popup-content">

                <img src={this.state.marker.image} alt={this.state.marker.name}/>
                <div>
                  <div className="pop-up-title is-size-6">
                    <strong>{this.state.marker.name}</strong>
                  </div>
                  <div className="pop-up-films"><strong>Films: </strong>
                    <ul>
                      {this.getFilms(this.state.marker.films).slice(0, 2).map(film =>
                        <li key={film}>{film}</li>
                      )}
                    </ul>
                  </div>
                </div>

              </div>
            </Popup>}

        </Map>
      </div>
    )
  }
}

export default MapShow
