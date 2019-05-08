import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createRoom } from '../services/api-helper'

class RoomForm extends Component {
  state = {
    formData: {
      title: ''
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }))
  }  

  handleSubmit = async () => {
    const room = await createRoom(this.state.formData)
    this.props.history.replace('/rooms/' + room.id)
  }

  render() {
    return (
      <div className="room-form">
        <h2>Create a Room</h2>
        <form onSubmit={event => {event.preventDefault(); this.handleSubmit(event)}}>
          <input name="title" value={this.state.formData.title} onChange={this.handleChange} placeholder="Title"/> <br />
          <button>Create room</button>
          {/*
          <label for=""></label>
          <input name="youtube_url" />
          */}
        </form>
      </div>
    )
  }
}

export default withRouter(RoomForm)
