import React from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/lib/Creatable'

let films = []

const createOption = () => {

}

const defaultOptions = [
  createOption()
]

export default class FilmSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      options: defaultOptions,
      value: null
    }

    this.handleCreate = this.handleCreate.bind(this)
  }


  handleCreate () {
    console.log(this.state)
  }

  componentDidMount() {
    axios.get('api/films')
      .then(res => {
        console.log(res.data)
        films = res.data.map(film => {
          return { value: film._id, label: film.title }
        })
        console.log(films)
        return films
      })
      .then(res => this.setState({isLoading: false, options: res}))
  }
  render() {
    if(this.state.isLoading) return null
    return (
      <CreatableSelect
        isClearable
        isDisabled={this.state.isLoading}
        isLoading={this.state.isLoading}
        onCreateOption={this.handleCreate}
        onChange={this.props.handleChange}
        options={this.state.options}
      />
    )
  }
}
