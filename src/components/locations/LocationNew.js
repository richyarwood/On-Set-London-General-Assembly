import React from 'react'
import Form from '../common/Form'
import axios from 'axios'
import Auth from '../../lib/Auth'

class LocationNew extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      location: {
        coordinates: {},
        sceneNotes: {}
      },
      errors: {},
      message: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getExistingFilm = this.getExistingFilm.bind(this)
  }

  getExistingFilm(e){
    axios.get(`/api/films/${e.value}`)
      .then(res => {
        const films = []
        films.push(res.data)
        const location = {...this.state.location, films, sceneNotes: {...this.state.location.sceneNotes, film: res.data}}
        this.setState({ location })
      })
  }


  handleChange(e){
    let location = this.state.location
    switch(true){
      case (e.name === 'areaOfLondon'):
        location = {...this.state.location, [e.name]: e.value}
        break
      case (!!e.target.dataset.sceneNotes):
        location = {...this.state.location, sceneNotes: {...this.state.location.sceneNotes, [e.target.name]: e.target.value}}
        break
      default:
        location = {...this.state.location, [e.target.name]: e.target.value}
    }
    this.setState({ location })
  }


  handleSubmit(e) {
    console.log(this.state.location)
    e.preventDefault()
    const token = Auth.getToken()
    axios.get(`https://cors-anywhere.herokuapp.com/api.mapbox.com/geocoding/v5/mapbox.places/${this.state.location.streetAddress}.json`, {
      params: {
        types: 'address',
        proximity: '-0.127758,51.507351',
        limit: 1,
        access_token: process.env.MAPBOX_API_TOKEN
      }
    })
      .then(res => {
        const location = {...this.state.location, coordinates: {lng: `${res.data.features[0].center[0]}`, lat: `${res.data.features[0].center[1]}`}}
        this.setState({ location })
      })
      .then(() => {
        console.log(token)
        axios.post('api/locations', this.state.location, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => {
            this.setState({message: res.data.message})
            setTimeout(() => {
              this.setState({message: ''})
              this.props.toggleRightBar(res.data.message)
            }, 1000)
          })
          .catch(err => console.log(err))
      })
  }



  render(){
    return(
      <section>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          getExistingFilm={this.getExistingFilm}
          errors={this.state.errors}
          addressLookup={this.addressLookup}
          newFilm={this.state.newFilm}
        />

        {this.state.message && <div className="notification is-success">{this.state.message}</div>}
      </section>
    )
  }
}

export default LocationNew