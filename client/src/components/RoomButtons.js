import React from 'react'
import { withRouter } from 'react-router-dom'

const RoomButtons = props => {
  return (
    <div className="room-buttons">
      <button onClick={() => props.history.push('/rooms/new')}>Create a Room</button>
      <h2>Or</h2>
      <button onClick={() => props.history.push('/rooms')}>Join a Room</button>
    </div>
  )
}

export default withRouter(RoomButtons)
