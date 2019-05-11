import React from 'react'
// import axios from 'axios'

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      center: {
        lat: '',
        long: ''
      },
      activeIndex: true
    }

    this.toggleActiveLocation = this.toggleActiveLocation.bind(this)
  }

  toggleActiveLocation() {
    const currentState = this.state.activeIndex
    this.setState({ activeIndex: !currentState })
  }

  render() {
    // console.log('data INDEX', this.state.data)
    console.log('props INDEX', this.props.data)
    // console.log('center INDEX', this.state.center)
    if (!this.props) return <h1>Loading...</h1>
    return (
      <div>
        {this.props.data.map(location =>
          <div
            key={location._id}
            // data-lat={location.coordinates.lat}
            // data-long={location.coordinates.long}
            // onClick={this.props.handleClick} >
          >
            <div
              onClick={this.toggleActiveLocation}
            >
              <div className="title is-4">{location.name}</div>
              <div className="location-image"
                data-lat={location.coordinates.lat}
                data-long={location.coordinates.long}
                onClick={this.props.handleClick}
                style={{ backgroundImage: `url(${location.image})` }} >
              </div>
            </div>
            <div
              className={!this.state.activeIndex ? null : 'hidden' }
              onClick={this.toggleActiveLocation}
            >
              <div className="adress">
                <p className="is-size-5"> {location.streetAddress} </p>
                <div className="level is-mobile">
                  <p className="level-left has-text-left is-size-6"> {location.postCode} </p>
                  <p className="level-right has-text-right is-size-6"> {location.areaOfLondon} </p>
                </div>
              </div>
              {location.films.map(film =>
                <div key={film._id}>
                  <div className="film-title is-1">{film.title}</div>
                </div>
              )}
              {location.sceneNotes.map(note =>
                <div key={note._id}>
                  <div className="sub-title is-5">{note.film.title}</div>
                  <div className="sub-title is-5">{note.text}</div>
                  { console.log(note.text) }
                </div>
              )}
            </div>
            <hr />
          </div>
        )}
      </div>
    )
  }
}


export default LocationIndex


// { console.log('clicked location', this.props.data) }

// <div
//  className={this.state.activeIndex ? null : 'hidden' }
//  onClick={this.toggleActiveLocation}
// >
