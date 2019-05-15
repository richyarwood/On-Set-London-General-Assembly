import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/Auth'

class EditProfile extends React.Component {

  constructor(){
    super()

    this.state = {
      data: null
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){

    const token = Auth.getToken()

    axios.get('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data })
  }

  render(){
    if(!this.state.data) return null
    console.log(this.state.data)
    return(
      <main>
        <section className="section">
          <div className="container">
            <div className="edit-form-wrapper">
              <div>
                <Link to="/">
                  <button className="button edit-profile">Back to map</button>
                </Link>

                <div className="title is-4">Edit your profile and notes</div>
                <form>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        name="username"
                        placeholder="eg: John Maps"
                        onChange={this.handleChange}
                        value={this.state.data.username || ''}
                      />
                    </div>
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        placeholder="eg: john.maps@email.com"
                        onChange={this.handleChange}
                        value={this.state.data.email || ''}
                      />
                    </div>
                  </div>

                </form>
                <section className="section">
                  {this.state.data.locations.map(location =>
                    <div key={location._id}>
                      <div className="title is-5">{location.name}</div>

                      {location.sceneNotes.map(note =>
                        note.createdBy === this.state.data._id &&
                          <div key={note._id}>
                            <div className="is-size-5">
                              {note.film.title}
                            </div>
                            <div className="is-size-5">
                              {note.createdBy.email}
                            </div>
                            <div className="is-size-5">
                            </div>
                            <div className="content">
                              {note.text}<br />
                              <p className="edit-button"><Link to="/locations/:id/scenenotes/:id">Edit this note</Link></p>
                            </div>
                          </div>
                      )}
                      <hr />
                    </div>
                  )}
                </section>

              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

}

export default EditProfile
