import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import areasOfLondon from '../../lib/areasOfLondon'


class LocationEntry extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }


  componentDidMount(){
    console.log(this.props.selectedFilm)
    axios.get(`/api/films/${this.props.selectedFilm.value}`)
      .then((res) =>  this.setState({selectedFilm: res.data}))
  }

  render() {
    if(!this.state.selectedFilm) return null
    return(
      <div>
        <div className="film-card-form">
          <div className="card">
            <div className="card-image film-image-form">
              <figure className="image is-centered">
                <img src={this.state.selectedFilm.image} alt="Film image" />
              </figure>
            </div>
            <div className="card-content">
              <p className="title is-6">{this.state.selectedFilm.title}</p>
            </div>
          </div>
        </div>
        <div className="field first-field">
          <label className="label">Location Name</label>
          <div className="control">
            <input className="input"
              name="name"
              type="text"
              placeholder="e.g. Relay Building"
              onChange={this.props.handleChange}
            />
          </div>
          <div>
            {this.props.errors.name &&<div className="help is-danger">{this.props.errors.name}</div>}
          </div>
        </div>
        <div><div className="field">
          <label className="label">Area of London</label>
          <Select
            options={areasOfLondon}
            name="areaOfLondon"
            onChange={this.props.handleChange}
          />
        </div>
        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <input className="input"
              name="streetAddress"
              type="text"
              placeholder="114 Whitechapel High St"
              onChange={this.props.handleChange}
            />
          </div>
          <div>
            {this.props.errors.streetAddress && <div className="help is-danger">{this.props.errors.streetAddress}</div>}
          </div>
        </div>
        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input className="input"
              name="postCode"
              type="text"
              placeholder="E1 7PT"
              onChange={this.props.handleChange}
            />
          </div>
          <div>
            {this.props.errors.postCode &&<div className="help is-danger">{this.props.errors.postCode}</div>}
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input className="input"
              name="image"
              type="text"
              placeholder="e.g. www.hondo-enterprises.com/the-relay-building-entrance-all.jpg"
              onChange={this.props.handleChange}
            />
          </div>
          <div>
            {this.props.errors.image &&<div className="help is-danger">{this.props.errors.image}</div>}
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
              onChange={this.props.handleChange}>
            </textarea>
          </div>
        </div>
        </div>
        <button className="submit button">Submit</button>
      </div>
    )
  }
}

export default LocationEntry
