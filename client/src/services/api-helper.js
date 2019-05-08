import { API_ROOT as baseUrl } from '../constants'

export const getRooms = () => {
  const opts = {
    headers: {
      'Authorization': 'Header ' + localStorage.getItem('token')
    }
  }
  return fetch(`${baseUrl}/rooms`, opts).then(resp => resp.json()).catch(e => e.message)
}

export const getRoom = id => {
  const opts = {
    headers: {
      'Authorization': 'Header ' + localStorage.getItem('token')
    }
  }
  return fetch(`${baseUrl}/rooms/${id}`, opts).then(resp => resp.json()).catch(e => e.message)
}

/*
export const getRoomMessages = id => {
  const opts = {
    headers: {
      'Authorization': 'Header ' + localStorage.getItem('token')
    }
  }
  return fetch(`${baseUrl}/rooms/${id}/messages`, opts).then(resp => resp.json()).catch(e => e.message)
}
*/

export const createRoom = roomData => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(roomData),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Header ' + localStorage.getItem('token')
    }
  }
  return fetch(`${baseUrl}/rooms`, opts).then(resp => resp.json()).catch(e => e.message)
}

export const loginUser = loginData => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/login`, opts).then(resp => resp.json()).catch(e => e.message)
} 

export const registerUser = registerData => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/users`, opts).then(resp => resp.json()).catch(e => e.message)
}
