import React from 'react'
import axios from 'axios'
import FilmSelect from '../films/FilmSelect'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import areasOfLondon from '../../lib/areasOfLondon'

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
      film: {},
      selectedFilm: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFilm = this.getFilm.bind(this)
  }
  getFilm(film){
    const selectedFilm = {...film}
    const films = []
    films.push(film.value)
    const sceneNotes = {...this.state.location.sceneNotes, film: film.value}
    const location = {...this.state.location, films, sceneNotes}
    this.setState({selectedFilm, location})
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
        <div className="column">
          <div className="title is-4">Create a new film location</div>
          {!Auth.isAuthenticated() &&
            <div>
              <p className="content">You need to be logged in to create a new film location</p>
              <Link to="/login"><p>Log in now</p></Link>
            </div>
          }
          {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>
            {!this.state.selectedFilm &&<FilmSelect
              handleChange={this.getExistingFilm}
              handleFilmImage={this.handleFilmImage}
              getFilm={this.getFilm}
            />}
            {this.state.selectedFilm &&
              <div>
                <h2 className="title is-5">{`Film: ${this.state.selectedFilm.label} `}</h2>
                <hr />
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input"
                      name="name"
                      type="text"
                      placeholder="e.g. Relay Building"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    {this.state.errors.name &&<div className="help is-danger">{this.state.errors.name}</div>}
                  </div>
                </div>
                <div><div className="field">
                  <label className="label">Area of London</label>
                  <Select
                    options={areasOfLondon}
                    name="areaOfLondon"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Address</label>
                  <div className="control">
                    <input className="input"
                      name="streetAddress"
                      type="text"
                      placeholder="114 Whitechapel High St"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    {this.state.errors.invalidOpenCageAddress && <div className="help is-danger">{this.state.errors.invalidOpenCageAddress}</div>}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Postcode</label>
                  <div className="control">
                    <input className="input"
                      name="postCode"
                      type="text"
                      placeholder="E1 7PT"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    {this.state.errors.postCode &&<div className="help is-danger">{this.state.errors.postCode}</div>}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Image</label>
                  <div className="control">
                    <input className="input"
                      name="image"
                      type="text"
                      placeholder="e.g. www.hondo-enterprises.com/the-relay-building-entrance-all.jpg"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    {this.state.errors.image &&<div className="help is-danger">{this.state.errors.image}</div>}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Scene Notes</label>
                  <div className="control">
                    <textarea
                      name="text"
                      className="textarea"
                      placeholder="Add scene notes..."
                      data-scene-notes="text"
                      onChange={this.handleChange}>
                    </textarea>
                  </div>
                </div>
                </div>
                <button className="submit">Submit</button>
              </div>
            }
          </form>
          }
        </div>

      </section>
    )
  }
}

export default LocationNew


// {this.state.message &
//   <div className="notification is-success">{this.state.message}</div>
// }
