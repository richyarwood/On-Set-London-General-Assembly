import React from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/lib/Creatable'

let films = []

export default class FilmSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      options: null
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleCreate(inputValue){
    const { options } = this.state
    axios.post('api/films', {title: inputValue})
      .then(res => {
        const newFilm = { value: res.data._id, label: res.data.title }
        this.setState({
          options: [...options, newFilm],
          label: newFilm.label,
          value: newFilm.value
        })
      })
  }

  handleChange(e){
    console.log(this.state)
    this.props.handleChange(e)
  }

  componentDidMount() {
    axios.get('api/films')
      .then(res => {
        films = res.data.map(film => {
          return { value: film._id, label: film.title }
        })
        return films
      })
      .then(res => this.setState({isLoading: false, options: res }))
  }

  render() {
    return (
      <CreatableSelect
        onCreateOption={this.handleCreate}
        onChange={this.handleChange}
        options={this.state.options}
      />
    )
  }
}
