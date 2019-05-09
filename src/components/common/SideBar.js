import React from 'react'

import SideBar from './SideBar'

const SideBar = ({ this }) => {
  return (
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
  )
}

export default SideBar
