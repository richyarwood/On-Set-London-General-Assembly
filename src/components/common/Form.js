import React from 'react'
import FilmSelect from '../films/FilmSelect'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import areasOfLondon from '../../lib/areasOfLondon'

class Form extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      selectedFilm: null
    }
    this.getFilm = this.getFilm.bind(this)
  }
  componentDidMount(){

  }


  getFilm(film){
    console.log(film, 'film')
    const selectedFilm = {...film}
    this.setState({selectedFilm})
    this.props.getFilm(this.state.selectedFilm)
  }
  render(){

    return(
      <div className="column">
        <div className="title is-4">Create a new film location</div>
        {!Auth.isAuthenticated() &&
          <div>
            <p className="content">You need to be logged in to create a new film location</p>
            <Link to="/login"><p>Log in now</p></Link>
          </div>
        }
        {Auth.isAuthenticated() && <form onSubmit={this.props.handleSubmit}>
          {!this.state.selectedFilm &&<FilmSelect
            handleChange={this.props.getExistingFilm}
            handleFilmImage={this.props.handleFilmImage}
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
                  {this.props.errors.invalidOpenCageAddress && <div className="help is-danger">{this.props.errors.invalidOpenCageAddress}</div>}
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
              <button className="submit">Submit</button>
            </div>
          }
        </form>
        }
      </div>
    )
  }
}

export default Form
