import React from 'react'
import axios from 'axios'

class EditSceneNote extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/locations/${this.props.match.params.id}/scenenotes/${this.props.match.params.sceneId}`)
      .then(res => this.setState({ data: res.data }))
  }

  handleChange(e){
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/locations/${this.props.match.params.id}/scenenotes/${this.props.match.params.sceneId}`, this.state.data)
      .then(() => this.props.history.push('/me'))
      .catch(err => console.log(err))
  }

  render(){
    if(!this.state.data) return null
    console.log(this.state.data)
    const data = this.state.data
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <img src={data.film.image} alt={data.film.title} />
            </div>
            <div className="column">
              <div className="title is-1">{data.film.title}</div>
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <div className="title is-5">Edit scene note</div>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="text"
                      type="text"
                      onChange={this.handleChange}
                      value={data.text || ''}
                    >
                    </textarea>
                  </div>
                </div>
                <button className="button">Save scene note</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default EditSceneNote
