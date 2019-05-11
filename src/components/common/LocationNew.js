import React from 'react'
import axios from 'axios'
import Form from './Form'

class LocationNew extends React.Component {

  constructor(){
    super()

    this.state = {
      location: {
        coordinates: {},
        sceneNotes: {},
        films: []
      },
      film: {
        title: ''
      }

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e){
    let location = this.state.location
    let film = this.state.film
    if(e.target.dataset.coordinates) {
      location = {...this.state.location, coordinates: {...this.state.location.coordinates, [e.target.name]: e.target.value}}
    } else if(e.target.dataset.sceneNotes) {
      location = {...this.state.location, sceneNotes: {...this.state.location.sceneNotes, [e.target.name]: e.target.value}}
    } else if(e.target.dataset.film) {
      film = {[e.target.name]: e.target.value}
    } else {
      location = {...this.state.location, [e.target.name]: e.target.value}
    }
    this.setState({ location, film })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('api/films', this.state.film)
      .then(res => {
        const films = []
        films.push(res.data)
        const sceneNotes = {...this.state.location.sceneNotes, film: res.data}
        const location = {...this.state.location, sceneNotes, films: films}
        this.setState({ location })
      })
      .then(
        axios.post('api/locations', this.state.location)
          .then(res => console.log(res))
      )
      .catch(err => console.log(err))

  }

  render(){
    console.log(this.state)
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
            </div>
            <Form
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
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
