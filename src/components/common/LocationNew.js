import React from 'react'
import Form from './Form'
import axios from 'axios'

class LocationNew extends React.Component {

  constructor(){
    super()

    this.state = {
      location: {
        coordinates: {},
        sceneNotes: {}
      },
      errors: {}
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
      case (!!e.target.dataset.coordinates):
        location = {...this.state.location, coordinates: {...this.state.location.coordinates, [e.target.name]: e.target.value}}
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
    e.preventDefault()
    axios.get(`https://cors-anywhere.herokuapp.com/api.mapbox.com/geocoding/v5/mapbox.places/${this.state.location.streetAddress}.json?types=address&proximity=-0.127758,51.507351&limit=1&access_token=${process.env.MAPBOX_API_TOKEN}`)
      .then(res => {
        const location = {...this.state.location, coordinates: {long: `${res.data.features[0].center[0]}`, lat: `${res.data.features[0].center[1]}`}}
        this.setState({ location })
      })
      .then(() => {
        axios.post('api/locations', this.state.location)
          .then(() => this.props.history.push('/'))
          .catch(err => this.setState({errors: err.response.data.errors}))
      })
  }

  render(){
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
            </div>
            <Form
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              getExistingFilm={this.getExistingFilm}
              errors={this.state.errors}
              addressLookup={this.addressLookup}
            />
            <div className="column">
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LocationNew
