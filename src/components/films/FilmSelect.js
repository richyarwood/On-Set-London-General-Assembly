import React from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/lib/Creatable'
import Auth from '../../lib/Auth'
let films = []

export default class FilmSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      options: null,
      selectedFilm: {},
      newFilm: false,
      filmImage: ''
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleFilmImage = this.handleFilmImage.bind(this)
    this.sortFilms = this.sortFilms.bind(this)
  }



  handleCreate(inputValue){
    const { options } = this.state
    const newFilm = { value: inputValue, label: inputValue }
    const selectedFilm = newFilm
    this.setState({
      options: [...options, newFilm],
      selectedFilm,
      newFilm: true
    })

  }



  handleSave(){
    if(!this.state.selectedFilm.value) return null
    else {
      if(this.state.newFilm) {
        console.log(this.state)
        const token = Auth.getToken()
        axios.post('/api/films', { title: this.state.selectedFilm.value, image: this.state.filmImage },  {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => {
            const selectedFilm = {value: res.data._id, title: res.data.title}
            this.setState({selectedFilm})
          })
          .then(() => this.props.getFilm(this.state.selectedFilm))
      } else {
        const selectedFilm = {value: this.state.selectedFilm.value, title: this.state.selectedFilm.label}
        this.setState({selectedFilm})
        this.props.getFilm(this.state.selectedFilm)
      }
    }
  }


  handleChange(inputValue){
    const selectedFilm = inputValue
    this.setState({ selectedFilm })
  }

  sortFilms(films){
    return films.sort((a, b) => {
      if (a.label === b.label) return 0
      return a.label < b.label ? -1 : 1
    })
  }

  handleFilmImage(e){
    const filmImage = e.target.value
    this.setState({ filmImage })
  }

  componentDidMount() {
    axios.get('/api/films')
      .then(res => {
        films = res.data.map(film => {
          return { value: film._id, label: film.title }
        })
        return this.sortFilms(films)
      })
      .then(res => this.setState({ options: res }))
  }

  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Choose a film title</label>
          <div className="control">
            <CreatableSelect
              onCreateOption={this.handleCreate}
              onChange={this.handleChange}
              options={this.state.options}
              onInputChange={this.handleInputChange}
              value={this.state.selectedFilm ? this.state.selectedFilm : null}
            />
          </div>
        </div>
        {this.state.newFilm &&
        <div className="field">
          <label className="label">Add a film image</label>
          <div className="control">
            <input className="input"
              name="filmImage"
              type="text"
              placeholder="e.g. www.hondo-enterprises.com/the-relay-building-entrance-all.jpg"
              onChange={this.handleFilmImage}
            />
          </div>
        </div>
        }
        <div className="button" onClick={this.handleSave}>Next</div>
      </div>
    )
  }
}
