import React from 'react'

class SideBar extends React.Component {

  constructor(){
    super()

    this.state = {
      data: [],
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
            <div className="title is-6">{location.name}</div>
            <div className="location-image"
              id={[location.coordinates.lat, location.coordinates.long]}
              style={{ backgroundImage: `url(${location.image})` }} onClick={this.handleClick}>
            </div>
            {location.films.map(film =>
              <div key={film.id} className="film-title">{film.title}</div>)}
            <hr />
          </div>
        )}
      </div>
    )
  }
}

export default SideBar
