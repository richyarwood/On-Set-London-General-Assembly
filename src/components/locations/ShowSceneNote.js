import React from 'react'
import axios from 'axios'

class ShowSceneNote extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      sceneNote: null
    }
  }

  componentDidMount() {
    axios.get(`/locations/${this.props.match.params.id}/scenenotes/${this.props.match.params.sceneid}`)
      .then(res => this.setState({ sceneNote: res.data }))
  }

  render(){
    console.log(this.state.data)
    return(
      <h1>Hello</h1>
    )
  }
}

export default ShowSceneNote
