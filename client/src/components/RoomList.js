import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { Link } from 'react-router-dom'
import { API_ROOT } from '../constants'
// import Cable from './Cables'

import { getRooms } from '../services/api-helper'

class RoomList extends Component {
  state = {
    rooms: [],
  }

  componentDidMount = async () => {
    const rooms = await getRooms()
    this.setState({rooms})
  }

  handleChangeRoom = resp => {
    switch (resp.method) {
      case 'PUT':
        this.setState(prevState => ({
          rooms: prevState.rooms.map(room => resp.room.id === room.id ? resp.room : room)
        })) 
        break
      case 'DELETE':
        this.setState(prevState => ({
          rooms: prevState.rooms.filter(room => resp.room.id !== room.id)
        })) 
        break
      case 'POST':
        this.setState(prevState => ({
          rooms: [...prevState.rooms, resp.room]
        })) 
        break
      default: 
        alert('Error: unknown broadcast')
    } 
  }

  render() {
    const { rooms } = this.state
    console.log(rooms)
    return (
      <div className="room-list">
        <ActionCable channel={{ channel: 'RoomsChannel' }} onReceived={this.handleChangeRoom} />
        {/*
        {this.state.rooms.length > 0 && 
          <Cable rooms={rooms} />
        }
        */}
        <h2>List of Rooms</h2>
        <ul>
          {rooms.length > 0 && rooms.map(room => <li><Link to={`/rooms/${room.id}`}>{room.title}</Link></li>)}
        </ul>
      </div>
    )
  }
}

export default RoomList
