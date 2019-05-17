import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MapShow from './MapShow'
import LocationIndex from '../locations/LocationIndex'
import LoginLogout from './LoginLogout'
import LocationNew from '../locations/LocationNew'
class Home extends React.Component {


  constructor(){
    super()

    this.state = {
      locations: null,
      center: {
        lat: 51.515714,
        lng: -0.095843
      },
      toggleSidebar: false,
      toggleRightBar: false,
      activeLocation: null,
      markerClick: false
    }

    this.handleLocationClick = this.handleLocationClick.bind(this)
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
    this.toggleRightBar = this.toggleRightBar.bind(this)
    this.toggleMarker = this.toggleMarker.bind(this)
    this.toggleActiveLocation = this.toggleActiveLocation.bind(this)
    this.updatePage = this.updatePage.bind(this)
    this.popUpShow = this.popUpShow.bind(this)
    this.getFilms = this.getFilms.bind(this)
    this.scrollLocationOnMarkerClick = this.scrollLocationOnMarkerClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.error(err))
  }


  // Moves the map to the correct marker on sidebar click=============
  handleLocationClick(e){
    const lat = e.target.dataset.lat
    const lng = e.target.dataset.lng
    this.setState( { center: { lat: lat, lng: lng } } )
  }

  // Toggles location index===========================================
  toggleSidebarClick(){
    this.setState({ toggleSidebar: !this.state.toggleSidebar})
  }

  // Toggles add location=============================================
  toggleRightBar() {
    this.setState({ toggleRightBar: !this.state.toggleRightBar })
    if(this.state.toggleRightBar) this.setState({ toggleSidebar: true})
    if(!this.state.toggleRightBar) this.setState({ toggleSidebar: true})
  }

  //Used to update page and toggle logout button to login==============
  updatePage(){
    this.forceUpdate()
  }

  //Provides the first two films for marker popup======================
  getFilms(films){
    return films.map(film => film.title).slice(0,2)
  }

  // This takes coordinates from the marker click to place the popup==
  popUpShow(marker){
    const lat = marker.coordinates.lat
    const lng = marker.coordinates.lng
    this.setState( { center: { lat: lat, lng: lng } } )
    if(this.state.markerClick) this.setState({ activeLocation: null, markerClick: !this.state.markerClick})
    else if(!this.state.markerClick) this.setState({ activeLocation: marker, markerClick: !this.state.markerClick})
  }

  // Scrolls the location index to the entry on map click===============
  scrollLocationOnMarkerClick(){
    document.getElementById(this.state.activeLocation._id)
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // This sets what has been clicked on the left side bar===============
  toggleActiveLocation(location){
    if(location === this.state.activeLocation && !this.state.markerClick) this.setState({ activeLocation: null })
    else this.setState({ activeLocation: location })
  }


  toggleMarker(marker){
    return this.state.activeLocation === marker? 'active-marker': 'marker'
  }

  render() {
    if (!this.state.locations) return <h1>Loading...</h1>
    return (
      <main>
        <div>
          <div
            className={`sidebar-wrapper${this.state.toggleSidebar ? ' close': ''}`}
          >
            <div className="sidebar">
              <img src="/images/on-set-london-logo.jpg" alt="On Set London movie Location database" className="logo"/>
              <hr />
              <LocationIndex
                data={this.state.locations}
                handleLocationClick={this.handleLocationClick}
                toggleActiveLocation={this.toggleActiveLocation}
                activeLocation={this.state.activeLocation}
              />
            </div>
            <div className="togglewrapper">
              <div
                className="togglebutton"
                onClick={this.toggleSidebarClick}
              >
                <FontAwesomeIcon icon="exchange-alt" size="1x"/>
              </div>
            </div>
          </div>
        </div>
        <div>

          <div className={`right-sidebar-wrapper${this.state.toggleRightBar ? ' open': ''}`}>
            <div className="map-icon cancel" onClick={this.toggleRightBar}>
              <FontAwesomeIcon icon="times-circle" size="4x"/>
            </div>
            <div className="sidebar">
              <LocationNew
                toggleRightBar={this.toggleRightBar}
              />
            </div>
          </div>
        </div>
        <div className="map">
          <MapShow
            data={this.state}
            scrollLocationOnMarkerClick={this.scrollLocationOnMarkerClick}
            toggleSidebarClick={this.toggleSidebarClick}
            popUpShow={this.popUpShow}
            toggleMarker = {this.toggleMarker}
            getFilms = {this.getFilms}
          />
        </div>
        <div className="map-icon" onClick={this.toggleRightBar}>
          <FontAwesomeIcon icon="plus-circle" size="4x"/>
        </div>
        <LoginLogout
          updatePage={this.updatePage}/>
      </main>

    )
  }
}

export default Home
