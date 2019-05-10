import React from 'react'

class LocationNew extends React.Component {

  constructor(){
    super()

    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e){
    const data = {...this.state.data, [e.target.name]: e.target.value}
    this.setState({ data })
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
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
                    data-parent="coordinates"
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
                    data-parent="coordinates"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Film Name</label>
                <div className="control">
                  <input className="input"
                    name="films.film"
                    type="text"
                    placeholder="Titanic"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Scene Notes</label>
                <div className="control">
                  <input className="input"
                    name="sceneNotes.text"
                    type="text"
                    placeholder="text"
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
