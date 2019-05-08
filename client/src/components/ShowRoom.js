import React, { Component } from 'react'
import decode from 'jwt-decode'

import { getRoom } from '../services/api-helper'
import { ActionCable } from 'react-actioncable-provider'

class ShowRoom extends Component {
  state = {
    room: {},
    currentUser: {},
    users: [],
    messages: [],
    messageToSubmit: ''
  }

  handleReceivedMessage = response => {
    this.setState(prevState => ({
      messages: [...prevState.messages, response.message]
    }))
  }

  handleMessageChange = event => {
    this.setState({messageToSubmit: event.target.value})
  }

  submitMessage = event => {

  }

  componentDidMount = async () => {
    const room = await getRoom(this.props.match.params.id)
    const currentUser = decode(localStorage.getItem('token'))
    this.setState({
      room,
      currentUser
    })
  }

  render() {
    const { room, currentUser } = this.state
    console.log(currentUser)
    return (
      <>
        <ActionCable key={room.id} channel={{channel : 'MessagesChannel', room: room.id }} onReceived={this.handleReceivedMessage} />
        <h1>{this.state.room.title}</h1>
        <div className="users-list">
          <h3>Users:</h3>
        </div>
        <div className="message-box">
          <h3>Messages:</h3>
          <ul>
          {this.state.messages.map(message => <li key={message.id}>{message.content}</li>)}
          </ul>
        </div>
        <form onSubmit={this.submitMessage}>
          <input name="message" type="text" onChange={this.handleMessageChange} value={this.messageToSubmit} />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default ShowRoom
