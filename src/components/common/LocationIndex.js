import React from 'react'

class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      activeIndex: true // how do I make this global value only affect the single mapped location click
    }
    // this.toggleActiveLocation = this.toggleActiveLocation.bind(this)
  }

  toggleActiveLocation(index){
    const currentState = this.state.activeIndex
    // currentState[index] = !currentState[index]
    // console.log('currentState INDEX', currentState[index])

    // if(currentState[index] === this.props[index]) {
    this.setState({ activeIndex: !currentState })
    console.log('INDEX', index)
    console.log('currentState', currentState)
    // }
  }


  render() {
    // console.log('data INDEX', this.state.data)
    console.log('props INDEX', this.props.data)
    if (!this.props) return <h1>Loading...</h1>
    return (
      <div>
        {this.props.data.map((location, index) =>
          <div key={location._id} >
            {// -----ITEMS ARE ALWAYS VISIBILE-----}
            }
            <div
              onClick={this.toggleActiveLocation.bind(this, index)}
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
              className={this.state.activeIndex ? 'null' : 'hidden' }
              onClick={this.toggleActiveLocation.bind(this, index)}
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
              className={!this.state.activeIndex ? 'null' : 'hidden' }
              onClick={this.toggleActiveLocation.bind(this, index)}
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





// onClick={this.toggleActiveLocation}

// { console.log('clicked location', this.props.data) }

// <div
//  className={this.state.activeIndex ? null : 'hidden' }
//  onClick={this.toggleClass}
// >

// toggleActiveLocation() {
//   const currentState = this.state.activeIndex
//   this.setState({ activeIndex: !currentState})
// }
