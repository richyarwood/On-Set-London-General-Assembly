import React from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/lib/Creatable'
import Auth from '../../lib/Auth'
let films = []

export default class FilmSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      options: null
    }
    this.handleCreate = this.handleCreate.bind(this)
  }


  handleCreate(inputValue){
    const token = Auth.getToken()
    console.log(token)
    const { options } = this.state
    axios.post('api/films', {title: inputValue},  {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        const newFilm = { value: res.data._id, label: res.data.title }
        this.setState({
          options: [...options, newFilm]
        })
      })
  }


  componentDidMount() {
    axios.get('api/films')
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
      <CreatableSelect
        onCreateOption={this.handleCreate}
        onChange={this.props.handleChange}
        options={this.state.options}
      />
    )
  }
}
