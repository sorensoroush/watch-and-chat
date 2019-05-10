import React, { Component } from 'react'
import decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'

import { getRoom, updateRoom, deleteRoom, createMessage } from '../services/api-helper'
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider'

class ShowRoom extends Component {
  state = {
    room: {},
    currentUser: {},
    users: [],
    messages: [],
    messageToSubmit: '',
    editting: false
  }

  handleReceivedMessage = message => {
    console.log(message)
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }))
  }

  handleMessageChange = event => {
    this.setState({messageToSubmit: event.target.value})
  }

  submitMessage = async event => {
    event.preventDefault()
    const msg = {
      room_id: this.state.room.id,
      user_id: this.state.currentUser.user_id,
      content: this.state.messageToSubmit
    }
    await createMessage(msg)
    this.setState({messageToSubmit: ''})
  }

  handleTitleEdit = async event => {
    event.preventDefault()
    const title = event.target.firstChild.value
    await this.setState(prevState => ({
      room: {
        ...prevState.room,
        title
      },
      editting: false
    }))
    const room = await updateRoom(this.state.room)
    console.log(room)
  }

  handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this room?')) await deleteRoom(this.state.room.id)
    this.props.history.replace('/rooms')
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
    const { room, currentUser, editting } = this.state
    console.log(room)
    console.log(currentUser)
    console.log(this.state.messages)
    return (
      <>
        <h1>{room.title}</h1> <br/>
        {room.owner_id === currentUser.user_id && (
          editting ? 
            <form onSubmit={this.handleTitleEdit}>
              <input name="edit-title" type="text" defaultValue={room.title}/>
              <button>Update</button>
            </form>
          :
            (<> <button onClick={() => this.setState({editting: true})}>Edit</button> <br/> 
            <button onClick={this.handleDelete}>Delete</button> </>)
        )}
        <div className="users-list">
          <h3>Users:</h3>
        </div>
        <div className="message-box"> <h3>Messages:</h3>
          <ActionCableConsumer key={room.id} channel={{channel : 'MessagesChannel', room: room.id }} onReceived={this.handleReceivedMessage}>
            <ul> 
            {this.state.messages.map(message => <li key={message.message.id}><span style={{fontWeight: 'bold'}}>{message.username}: </span>{message.message.content}</li>)}
            </ul>
          </ActionCableConsumer>
        </div>
        <form onSubmit={this.submitMessage}>
          <input name="message" type="text" onChange={this.handleMessageChange} value={this.state.messageToSubmit} />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default withRouter(ShowRoom)
