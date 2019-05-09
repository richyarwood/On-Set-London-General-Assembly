import React from 'react'

class LocationShow extends React.Component {

  constructor(){
    super()

    this.state = {
      data: [
        {
          id: '1',
          name: 'Relay Building',
          image: 'http://www.orms.co.uk/wp-content/uploads/2016/05/Orms_Acry_Relay_Aldgate.jpg',
          areaOfLondon: 'City of London',
          streetAddress: '30 Hexham Road',
          postCode: 'SE27 9ED',
          coordinates: {
            lat: '-0.0721662',
            long: '51.515259'
          }
        }
      ],
      locations: [],
      center: {
        lat: -0.070839,
        long: 51.515619
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    const data = e.target.id.split(',')
    this.setState( { center: { lat: data[0], long: data[1] } } )
  }

  render() {
    return (
      <div>
        {this.state.data.map(location =>
          <div key={location.id}>
            <div className="title is-1">{location.name}</div>
            <div className="location-image"
              id={[location.coordinates.lat, location.coordinates.long]}
              style={{ backgroundImage: `url(${location.image})` }} onClick={this.handleClick}>
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
