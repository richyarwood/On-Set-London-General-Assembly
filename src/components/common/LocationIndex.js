import React from 'react'

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      activeLocation: null
    }
  }

  toggleActiveLocation(location){
    if(location === this.state.activeLocation) this.setState({ activeLocation: null })
    else this.setState({ activeLocation: location })
  }

  render() {
    if (!this.props) return <h1>Loading...</h1>
    return (
      <div>
        {this.props.data.map(location =>
          <div key={location._id} id={location._id}>
            {// -----ITEMS ARE ALWAYS VISIBILE-----}
            }
            <div
              onClick={() => this.toggleActiveLocation(location)}
            >
              <div className="title is-4">{location.name}</div>
              <div className="subtitle is-6">{location.areaOfLondon}</div>
              <div className="location-image"
                data-lat={location.coordinates.lat}
                data-lng={location.coordinates.lng}
                onClick={this.props.handleClick}
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
                    <div className="column"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Lara_Croft_film.jpg/220px-Lara_Croft_film.jpg" /></div>
                    <div className="column is-four-fifths">
                      <div className="subtitle is-size-5 has-text-weight-bold indexTitle">{note.film.title}</div>
                      <p className="is-5">{note.text}</p>
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
