import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/Auth'


class EditProfile extends React.Component {

  constructor(){
    super()

    this.state = {
      data: {}
    }

    this.editProfileHandleChange = this.editProfileHandleChange.bind(this)
  }

  componentDidMount(){
    const token = Auth.getToken()

    axios.get('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error( err ))
  }

  editProfileHandleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render(){
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
                        onChange={this.editProfileHandleChange}
                        value={this.state.data.username || ''}
                      />
                    </div>
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        placeholder="eg: john.maps@email.com"
                        onChange={this.editProfileHandleChange}
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
