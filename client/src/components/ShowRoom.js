import React, { Component } from 'react'

import { getRoom } from '../services/api-helper'
import { ActionCable } from 'react-actioncable-provider'

class ShowRoom extends Component {
  state = {
    room: {},
    users: [],
    messages: []
  }

  handleReceivedMessage = response => {
    this.setState(prevState => ({
      messages: [...prevState.messages, response.message]
    }))
  }

  componentDidMount = async () => {
    const room = await getRoom(this.props.match.params.id)
    this.setState({room})
  }

  render() {
    const { room } = this.state
    return (
      <>
        <ActionCable key={room.id} channel={{channel : 'MessagesChannel', room: room.id }} onReceived={this.handleReceivedMessage} />
        <h1>{this.state.room.title}</h1>
        <div className="users-list">
          <h2>Users:</h2>
        </div>
        <div className="chat-box">
          <h2>Messages:</h2>
          <ul>
          {this.state.messages.map(message => <li key={message.id}>{message.content}</li>)}
          </ul>
        </div>
      </>
    )
  }
}

export default ShowRoom
