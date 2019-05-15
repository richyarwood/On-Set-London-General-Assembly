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
      toggleRightBar: false
    }

    this.handleLocationClick = this.handleLocationClick.bind(this)
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
    this.toggleRightBar = this.toggleRightBar.bind(this)
    this.updatePage = this.updatePage.bind(this)
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
  }

  updatePage(){
    this.forceUpdate()
  }


  //Scrolls the location index to the entry on map click===============
  scrollLocationOnMarkerClick(locationId){
    document.getElementById(locationId)
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  toggleActiveLocation(location){
    if(location === this.state.activeLocation) this.setState({ activeLocation: null })
    else this.setState({ activeLocation: location })
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
