import React from 'react'
import FilmSelect from './FilmSelect'



class Form extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  render(){
    return(
      <div className="column">
        <form onSubmit={this.props.handleSubmit}>
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
          </div>
          <div className="field">
            <label className="label">Film name</label>
            <div className="control">
              <FilmSelect
                handleChange={this.props.getExistingFilm}
                value={this.props.valueSelect}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
              />
            </div>
          </div>
          <button className="button is-info">Submit</button>
        </form>
      </div>
    )
  }
}

export default Form
