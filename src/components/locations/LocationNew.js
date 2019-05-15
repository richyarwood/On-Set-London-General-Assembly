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
      message: '',
      film: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFilm = this.getFilm.bind(this)
  }

  getFilm(film){
    console.log(film, 'hey')
    const films = []
    films.push(film)
    const location = {...this.state.location, films, sceneNotes: {...this.state.location.sceneNotes, film: film}}
    this.setState({ location, film: film })
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
    e.preventDefault()
    const token = Auth.getToken()
    axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: process.env.OPENCAGE_API_TOKEN,
        q: this.state.location.streetAddress
      }
    })
      .then(res => {
        if(res.data.results[0]) {
          const location = {
            ...this.state.location,
            coordinates: {
              lng: res.data.results[0].geometry.lng,
              lat: res.data.results[0].geometry.lat
            }
          }
          this.setState({ location })
        } else {
          const errors = {
            ...this.state.errors,
            invalidOpenCageAddress: 'Please enter a valid address'
          }
          this.setState({ errors })
        }
      })
      .then(() => {
        return axios.post('api/locations', this.state.location, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      })
      .then(res => {
        this.setState({message: res.data.message})
        setTimeout(() => {
          this.setState({message: ''})
          this.props.toggleRightBar(res.data.message)
        }, 1000)
      })
      // .catch(err => {
      //   console.log(err)
      //   const errors = {...this.state.errors, ...err.response.data.errors}
      //   this.setState({ errors })
      // })
  }



  render(){
    return(
      <section>
        <Form
          handleChange={this.handleChange}
          handleFilmImage={this.handleFilmImage}
          handleSubmit={this.handleSubmit}
          getFilm={this.getFilm}
          errors={this.state.errors}
          addressLookup={this.addressLookup}
        />

      </section>
    )
  }
}

export default LocationNew


// {this.state.message &
//   <div className="notification is-success">{this.state.message}</div>
// }
