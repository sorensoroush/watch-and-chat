const baseUrl = 'http://localhost:3000'

export const createRoom = roomData => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(roomData),
    headers: {
      'Content-type': 'application/json',
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
