import React from 'react'
import axios from 'axios'

class SideBar extends React.Component {

  constructor(){
    super()

    this.state = {
      data: [],
      locations: [],
      center: {
        lat: '',
        long: ''
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => this.setState({ locations: res.data }))
  }

  handleClick(e){
    const data = e.target.id.split(',')
    this.setState( { center: { lat: data[0], long: data[1] } } )
  }

  render() {
    console.log('data', this.state.data)
    console.log('locations', this.state.locations)
    return (
      <div>
        {this.state.locations.map((location) =>
          <div key={location._id}>
            <div className="title is-4">{location.name}</div>
            <div className="location-image"
              id={[location.coordinates.lat, location.coordinates.long]}
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

export default SideBar
