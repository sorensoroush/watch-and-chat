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

  handleReceivedRoom = room  => {
    this.setState(prevState => ({
      rooms: [...prevState.rooms, room]
    }))
  }

  render() {
    const { rooms } = this.state
    console.log(rooms)
    return (
      <div className="room-list">
        <ActionCable channel={{ channel: 'RoomsChannel' }} onReceived={this.handleReceivedRoom} />
        {/*
        {this.state.rooms.length > 0 && 
          <Cable rooms={rooms} />
        }
        */}
        <h2>List of Rooms</h2>
        <ul>
          {rooms.length > 0 && rooms.map(room => <li><Link to="rooms/{room.id}">{room.title}</Link></li>)}
        </ul>
      </div>
    )
  }
}

export default RoomList
