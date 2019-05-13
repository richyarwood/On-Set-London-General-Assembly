import React from 'react'

import Select from 'react-select'
import defaultAreasOfLondon from './areasOfLondon'
const areasOfLondon = [{ name: 'areaOfLondon', value: 'All', label: 'All' }, ...defaultAreasOfLondon ]


class LocationIndex extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      activeLocation: null,
      area: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  toggleActiveLocation(location){
    if(location === this.state.activeLocation) this.setState({ activeLocation: null })
    else this.setState({ activeLocation: location })
  }

  handleChange(inputValue) {
    console.log('inputValue', inputValue.value)
    this.setState({ area: inputValue.value })
    console.log('state category', this.state.area)

    // const locations = this.sortedLocations()
    const inputArea = this.state.area
    // const filtered = this.sortedLocations().map(location =>
    //   location.areaOfLondon.filter(area =>
    //     area.includes(inputArea)
    //   )
    //   // inputArea.includes(location.areaOfLondon)
    // )
    // console.log('AREAS OF LONDON', location.areaOfLondon)
    console.log('filtered 🤞', this.props.data.filter(location =>
      location.areaOfLondon === inputArea
    ))
    // this.props.data.map().filter()
    // this.filteredLocations()
    // this.props.data.map(location =>
    //   // console.log('AREAS OF LONDON', location.areaOfLondon)
    //   location.areaOfLondon.filter(area =>
    //     area.includes(this.state.area)
    //   )
    // )
    // areas.filter(area =>
    //   area.includes(this.state.area)
    // )
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

  filteredLocations() {
    console.log('areaInput', areaInput)
    console.log('state category filter', this.state.area)
    const locations = this.sortedLocations()
    const area = this.state.area
    const areaInput = this.props.data
    if (area === 'all') return this.props.data
    // locations = locations.filter(location => location.areaOfLondon === area)
    console.log('locations', locations)
    // return locations.filter(area =>
    //   // IF THE INPUT VALUE = STATE AREA
    // )
  }

  render() {
    if (!this.props) return <h1>Loading...</h1>
    console.log('data render', this.props.data)
    return (
      <div>
        <Select
          defaultValue={areasOfLondon[0]}
          options={areasOfLondon}
          name="areaOfLondon"
          onChange={this.handleChange}
        />
        <hr />
        {this.sortedLocations().map(location =>
          <div key={location._id} >
            {// -----ITEMS ARE ALWAYS VISIBILE-----}
            }
            <div
              onClick={() => this.toggleActiveLocation(location)}
            >
              <div className="title is-4">{location.name}</div>
              <div className="subtitle is-6">{location.areaOfLondon}</div>
              <div className="location-image"
                data-lat={location.coordinates.lat}
                data-long={location.coordinates.long}
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
