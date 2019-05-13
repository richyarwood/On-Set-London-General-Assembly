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

  // set state search: ''
  // set state.catergoy
  // if empty (cat.length[0]), show all
  // filter on entire index array
  // prod.cat === value of input return it
  // // location =>
  // return location.region

  // make a func filter location, first sort by called sort func, then flter and map over filter results in render

  render() {
    console.log([ ...this.props.data ])
    console.log('locations-2', this.props.data)
    if (!this.props) return <h1>Loading...</h1>
    return (
      <div>
        {this.sortedLocations().map(location =>
          <div key={location._id} >
            {// -----ITEMS ARE ALWAYS VISIBILE-----}
            }
            <div
              onClick={() => this.toggleActiveLocation(location)}
            >
              <div className="title is-4">{location.name}</div>
              <div className="location-image"
                data-lat={location.coordinates.lat}
                data-long={location.coordinates.long}
                onClick={this.props.handleClick}
                style={{ backgroundImage: `url(${location.image})` }} >
              </div>
            </div>

            {// -----ITEMS ARE VISIBILE ON LOAD AND DISAPPEAR ON CLICK-----
            }
            <div
              className={this.state.activeLocation === location ? 'hidden' : 'active' }
              onClick={() => this.toggleActiveLocation(location)}
            >
              {location.films.map(film =>
                <div key={film._id}>
                  <div className="film-title is-1">{film.title}</div>
                </div>
              )}
            </div>

            {// -----ITEMS ARE NOT VISIBILE ON LOAD AND APPEAR ON CLICK-----
            }
            <div
              className={this.state.activeLocation !== location ? 'hidden' : 'active' }
              onClick={() => this.toggleActiveLocation(location)}
            >
              <div className="adress">
                <p className="is-size-5"> {location.streetAddress} </p>
                <div className="level is-mobile">
                  <p className="level-left has-text-left is-size-6"> {location.postCode} </p>
                  <p className="level-right has-text-right is-size-6"> {location.areaOfLondon} </p>
                </div>
              </div>
              <hr />
              {location.sceneNotes.map(note =>
                <div key={note._id}>
                  <div className="sub-title film-title is-5">{note.film.title}</div>
                  <div className="sub-title scene-note is-5">{note.text}</div>
                </div>
              )}
            </div>
            <hr className="divider" />
          </div>
        )}
      </div>
    )
  }
}


export default LocationIndex
