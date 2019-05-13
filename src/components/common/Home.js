import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Select from 'react-select'
import areasOfLondon from './areasOfLondon'

import Map from './Map'
import LocationIndex from './LocationIndex'
import LoginLogout from './LoginLogout'
import LocationNew from './LocationNew'
class Home extends React.Component {

  constructor(){
    super()

    this.state = {
      locations: null,
      center: {
        lat: '51.520119',
        long: '-0.098549'
      },
      toggleSidebar: false,
      toggleRightBar: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
    this.toggleRightBar = this.toggleRightBar.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.error(err))
  }

  handleClick(e){
    const lat = e.target.dataset.lat
    const long = e.target.dataset.long
    this.setState( { center: { lat: lat, long: long } } )
    this.toggleSidebarClick = this.toggleSidebarClick.bind(this)
  }

  toggleSidebarClick(){
    console.log('clicked')
    this.setState({ toggleSidebar: !this.state.toggleSidebar})
  }

  toggleRightBar(message) {
    console.log(message)
    this.setState({ toggleRightBar: !this.state.toggleRightBar, message: message })
    console.log(this.state.message)
  }

  render() {
    if (!this.state.locations) return <h1>Loading...</h1>
    return (
      <main>
        <div>
          <div className={`sidebar-wrapper${this.state.toggleSidebar ? ' close': ''}`}>
            <div className="sidebar">
              <img src="/images/on-set-london-logo.jpg" alt="On Set London movie Location database" />
              <hr />
              <Select
                defaultValue={areasOfLondon[0]}
                options={areasOfLondon}
                name="areaOfLondon"
                onChange={this.props.handleChange}
              />
              <hr />
              <LocationIndex data={this.state.locations} handleClick={this.handleClick} />
            </div>
            <div className="togglewrapper">
              <div className="togglebutton" onClick={this.toggleSidebarClick}><FontAwesomeIcon icon="exchange-alt" size="1x"/></div>
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
                toggleRightBar={this.toggleRightBar}/>
            </div>
          </div>
        </div>
        <div className="map">
          <Map data={this.state} />
        </div>
        <div className="map-icon" onClick={this.toggleRightBar}>
          <FontAwesomeIcon icon="plus-circle" size="4x"/>
        </div>
        <LoginLogout />
      </main>

    )
  }
}

export default Home
