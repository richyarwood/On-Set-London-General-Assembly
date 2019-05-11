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
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getExistingFilm = this.getExistingFilm.bind(this)
  }

  getExistingFilm(e){
    console.log(e.value)
    axios.get(`/api/films/${e.value}`)
      .then(res => {
        const films = []
        films.push(res.data)
        const location = {...this.state.location, films, sceneNotes: {...this.state.location.sceneNotes, film: res.data}}
        this.setState({ location })
        console.log(this.state)
      })
  }

  handleChange(e){
    let location = this.state.location
    if(e.target.dataset.coordinates) {
      location = {...this.state.location, coordinates: {...this.state.location.coordinates, [e.target.name]: e.target.value}}
    } else if(e.target.dataset.sceneNotes) {
      location = {...this.state.location, sceneNotes: {...this.state.location.sceneNotes, [e.target.name]: e.target.value}}
    } else {
      location = {...this.state.location, [e.target.name]: e.target.value}
    }
    this.setState({ location })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('api/locations', this.state.location)
      .then(res => console.log(res))
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err))
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
