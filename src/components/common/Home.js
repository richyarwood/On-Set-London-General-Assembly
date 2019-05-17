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

  handleLocationClick(e){
    const lat = e.target.dataset.lat
    const lng = e.target.dataset.lng
    this.setState( { center: { lat: lat, lng: lng } } )
    console.log(this.state.center)
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
  }

  toggleSidebarClick(){
    console.log('clicked')
    this.setState({ toggleSidebar: !this.state.toggleSidebar})
  }

  toggleRightBar(message) {
    this.setState({ toggleRightBar: !this.state.toggleRightBar, message: message })
    if(this.state.toggleRightBar) this.setState({ toggleSidebar: true})
    if(!this.state.toggleRightBar) this.setState({ toggleSidebar: true})
  }

  updatePage(){
    this.forceUpdate()
  }

  getFilms(films){
    return films.map(film => film.title).slice(0,2)
  }

  popUpShow(marker){
    const lat = marker.coordinates.lat
    const lng = marker.coordinates.lng
    this.setState( { center: { lat: lat, lng: lng } } )
    if(this.state.markerClick) this.setState({ activeLocation: null, markerClick: !this.state.markerClick})
    else if(!this.state.markerClick) this.setState({ activeLocation: marker, markerClick: !this.state.markerClick})
  }

  //Scrolls the location index to the entry on map click===============
  scrollLocationOnMarkerClick(){
    document.getElementById(this.state.activeLocation._id)
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
            toggleSideBar={this.state.toggleSidebar}
            activeLocation={this.state.activeLocation}
            popUpShow={this.popUpShow}
            marker={this.state.marker}
            markerClick={this.state.markerClick}
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
