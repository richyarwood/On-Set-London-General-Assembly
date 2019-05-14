import React from 'react'

class LocationShow extends React.Component {

  constructor(){
    super()

    this.state = {
      data: [],
      locations: [],
      center: {
        lat: -0.070839,
        lng: 51.515619
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(coordinates){
    this.setState({ center: coordinates })
  }

  render() {
    return (
      <div>
        {this.state.data.map(location =>
          <div key={location.id}>
            <div className="title is-1">{location.name}</div>
            <div className="location-image"
              style={{ backgroundImage: `url(${location.image})` }}
              onClick={() => this.handleClick(location.coordinates)}>
            </div>
            {location.films.map(film =>
              <div key={film.id} className="film-title is-1">{film.title}</div>)}
            <hr />
          </div>
        )}
      </div>
    )
  }
}

export default LocationShow
