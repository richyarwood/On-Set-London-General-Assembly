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

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    const lat = e.target.dataset.lat
    const long = e.target.dataset.long
    this.setState( { center: { lat: lat, long: long } } )
    console.log('center INDEX', this.state.center)
    // console.log('coordinates INDEX', data)
  }

  render() {
    // console.log('data INDEX', this.state.data)
    console.log('props INDEX', this.props.data)
    if (!this.props.data) return <h1>Loading...</h1>
    return (
      <div>
        {this.props.data.map(location =>
          <div key={location._id}>
            <div className="title is-4">{location.name}</div>
            <div className="location-image"
              data-lat={location.coordinates.lat}
              data-long={location.coordinates.long}
              style={{ backgroundImage: `url(${location.image})` }} onClick={this.handleClick}>
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
