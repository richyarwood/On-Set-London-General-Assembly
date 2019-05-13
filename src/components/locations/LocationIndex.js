import React from 'react'

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      activeLocation: null,
      sort: 'name|asc'
    }
  }

  toggleActiveLocation(location){
    if(location === this.state.activeLocation) this.setState({ activeLocation: null })
    else this.setState({ activeLocation: location })
  }

  sortedLocations() {
    return this.props.data.sort((a, b) => {
      if (a.name === b.name) return 0
      return a.name < b.name ? -1 : 1
    })
  }

  render() {
    if (!this.props) return <h1>Loading...</h1>
    return (
      <div>
        {this.sortedLocations().map(location =>
          <div key={location._id} id={location._id}>
            <div
              onClick={() => this.toggleActiveLocation(location)}
            >
              <div className="title is-4">{location.name}</div>
              <div className="subtitle is-6">{location.areaOfLondon}</div>
              <div className="location-image"
                data-lat={location.coordinates.lat}
                data-lng={location.coordinates.lng}
                onClick={this.props.handleLocationClick}
                style={{ backgroundImage: `url(${location.image})` }} >
              </div>
              <div className="is-size-6"> {`${location.streetAddress}, ${location.postCode}`}
              </div>
            </div>

            {// -----ITEMS ARE HIDDEN ON LOAD AND APPEAR ON CLICK-----
            }
            <div
              className={`locationShow${this.state.activeLocation !== location ? '' : ' show' }`}>
              <hr />
              <div className="subtitle is-size-6">Films and notes</div>
              {location.sceneNotes.map(note =>
                <div key={note._id} className="note-wrapper">
                  <div className="columns">
                    <div className="column">
                      <img src={note.film.image} />
                    </div>
                    <div className="column is-four-fifths">
                      <div className="subtitle is-size-5 has-text-weight-bold indexTitle">
                        {note.film.title}
                      </div>
                      <p className="is-5">
                        {note.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <hr className="dark-hr" />
          </div>
        )}
      </div>
    )
  }
}


export default LocationIndex
