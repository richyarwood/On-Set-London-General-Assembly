import React from 'react'
import Promise from 'bluebird'
import axios from 'axios'


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
        console.log(this.state.location)
      })
      .then(
        axios.post('api/locations', this.state.location)
          .then(res => console.log(res))
      )
      .catch(err => console.log(err))

  }

  render(){
    return(
      <div className="container">
        <div className="columns">
          <div className="column">
          </div>
          <div className="column">
            <form onSubmit={this.handleSubmit}>
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
              </div>
              <div className="field">
                <label className="label">Film name</label>
                <div className="control">
                  <input className="input"
                    name="title"
                    type="text"
                    placeholder="e.g. Relay Building"
                    data-film="film"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Area of London</label>
                <div className="control">
                  <input className="input"
                    name="areaOfLondon"
                    type="text"
                    placeholder="e.g. East London"
                    onChange={this.handleChange}
                  />
                </div>
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
              </div>
              <div className="field">
                <label className="label">Latitude</label>
                <div className="control">
                  <input className="input"
                    name="lat"
                    type="text"
                    placeholder="Lat"
                    data-coordinates="coordinates"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Longitude</label>
                <div className="control">
                  <input className="input"
                    name="long"
                    type="text"
                    placeholder="Long"
                    data-coordinates="coordinates"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Scene Notes</label>
                <div className="control">
                  <input className="input"
                    name="text"
                    type="text"
                    placeholder="text"
                    data-scene-notes="text"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button className="button is-info">Submit</button>
            </form>
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    )
  }
}

export default LocationNew
