import React from 'react'
// import axios from 'axios'

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      center: {
        lat: '',
        long: ''
      }
    }
  }

  render() {
    console.log('props', this.props.data)
    if (!this.props) return <h1>Loading...</h1>
    return (
      <div>
        {this.props.data.map(location =>
          <div key={location._id}>
            <div className="title is-4">{location.name}</div>
            <div className="location-image"
              data-lat={location.coordinates.lat}
              data-long={location.coordinates.long}
              style={{ backgroundImage: `url(${location.image})` }} onClick={this.props.handleClick}>
            </div>
            {location.films.map(film =>
              <div key={film._id} className="film-title is-1">{film.title}</div>)}
            <hr />
          </div>
        )}
      </div>
    )
  }
}

export default LocationIndex
