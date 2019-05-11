import React from 'react'
import Form from './Form'
import axios from 'axios'

class LocationNew extends React.Component {

  constructor(){
    super()

    this.state = {
      location: {
        coordinates: {},
        sceneNotes: {},
        films: []
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getExistingFilm = this.getExistingFilm.bind(this)
  }

  getExistingFilm(e){
    console.log(e.value)
    axios.get(`/api/films/${e.value}`)
      .then(res => console.log(res))

  }

  handleChange(){
    console.log('hi')
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('hi')

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





// axios.get(`/api/films/${e.value}`)
//   .then(res => {
//     films.push(res.data)
//     location = {...this.state.location, films}
//     console.log(location)
//   })\



// let film = this.state.film
// axios.get(`/api/films/${e.value}`)
//   .then(res => {
//     const films = this.state.location.films
//     films.push(res.data)
//     // location = {...this.state.location, films}
//     console.log(location)
//   })


// axios.post('api/films', this.state.film)
//   .then(res => {
  // console.log(this.state.films)
  //   const sceneNotes = {...this.state.location.sceneNotes, films: this.state.films.title}
  //   const location = {...this.state.location, sceneNotes, films: this.state.films.title}
  //   this.setState({ location })
  //   console.log(this.state.location)
  // // })
  // // .then(
  //   // console.log(this.state.location)
  //   axios.post('api/locations', this.state.location)
  //     .then(res => console.log(res))
  //     // .then(() => this.props.history.push('/'))
  // // )
  // .catch(err => console.log(err))



  // let location = this.state.location
  // let film = this.state.film
  // if(e.target.dataset.coordinates) {
  //   location = {...this.state.location, coordinates: {...this.state.location.coordinates, [e.target.name]: e.target.value}}
  // } else if(e.target.dataset.sceneNotes) {
  //   location = {...this.state.location, sceneNotes: {...this.state.location.sceneNotes, [e.target.name]: e.target.value}}
  // } else if(e.target.dataset.film) {
  //   film = {[e.target.name]: e.target.value}
  // } else {
  //   location = {...this.state.location, [e.target.name]: e.target.value}
  // }
  // this.setState({ location, film })
