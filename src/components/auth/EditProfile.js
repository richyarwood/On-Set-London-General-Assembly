import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Promise from 'bluebird'


class EditProfile extends React.Component {

  constructor(){
    super()

    this.state = {
      data: {},
      locations: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    const token = Auth.getToken()

    Promise.props({
      data: axios.get('/api/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.data),
      locations: axios.get('/api/locations').then(res => res.data)
    })
      .then(data => this.setState(data))
      .catch(err => console.error(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render(){
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

              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

}

export default EditProfile
