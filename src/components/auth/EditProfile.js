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
  }

  componentDidMount(){

    const token = Auth.getToken()

    axios.get('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err))
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

                <div className="title is-4">Profile and notes</div>
                <label className="label">Username</label>
                <div>{this.state.data.username}</div>

                <label className="label">Email</label>
                <div>{this.state.data.email}</div>
                <hr />
                <section>
                  <div className="title is-3">My scene notes</div>
                  {this.state.data.locations.map(location =>
                    <div key={location._id}>
                      <div className="title is-4">{location.name}</div>

                      {location.sceneNotes.map(note =>
                        note.createdBy === this.state.data._id &&
                          <div key={note._id}>
                            <div className="columns">
                              <div className="column is-one-fifth">
                                <img src={note.film.image} alt={location.title} />
                              </div>
                              <div className="column">
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
                                </div>
                              </div>
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
