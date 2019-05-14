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
      newFilm: false
    }
    this.handleCreate = this.handleCreate.bind(this)
  }



  handleCreate(inputValue){
    const token = Auth.getToken()
    const { options } = this.state
    axios.post('/api/films', {title: inputValue},  {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        const newFilm = { value: res.data._id, label: res.data.title }
        this.setState({
          options: [...options, newFilm],
          newFilm: res.data
        })
      })
  }



  handleInputChange(inputValue){
    console.log(inputValue, 'input')
    console.log(this.state.selectedFilm, 'value')
    this.setState({selectedFilm: inputValue })
    console.log(this.state.selectedFilm, 'value')
  }


  componentDidMount() {
    axios.get('/api/films')
      .then(res => {
        films = res.data.map(film => {
          return { value: film._id, label: film.title }
        })
        return films
        // return  films.sort
      })
      .then(res => this.setState({isLoading: false, options: res }))
  }

  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Film title</label>
          <div className="control">
            <CreatableSelect
              onCreateOption={this.handleCreate}
              onChange={this.props.handleChange}
              options={this.state.options}
            />
          </div>
        </div>
        {this.state.newFilm &&
        <div className="field">
          <label className="label">Film image</label>
          <div className="control">
            <input className="input"
              name="filmImage"
              type="text"
              placeholder="e.g. www.hondo-enterprises.com/the-relay-building-entrance-all.jpg"
              onChange={this.props.handleFilmImage}
            />
          </div>
        </div>
        }
      </div>
    )
  }
}
