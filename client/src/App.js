import React, { Component }  from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import './App.css'

import { loginUser, registerUser } from './services/api-helper'

class App extends Component {
  state = {
    authForm: {
      username: '',
      password: ''
    }
  }

  handleAuthChange = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      authForm: {
        ...prevState.authForm,
        [name]: value
      }
    }))
  }

  handleRegister = async event => {
    let { authForm }  = this.state
    let resp = await registerUser(authForm)
    console.log(`Registered in as ${authForm.username} with ${authForm.password}`)
    await console.log(resp)
    this.handleLogin(event)
  }

  handleLogin = async event => {
    let { authForm }  = this.state
    let resp = await loginUser(authForm)
    console.log(`Logged in as ${authForm.username} with ${authForm.password}`)
    // localStorage.setItem('token', 'Bearer ' + token)
    this.setState(prevState => ({
      authForm: {
        username: '',
        password: ''
      }
    }))
  }

  handle

  render() {
    const { username, password } = this.state.authForm
    return (
      <div className="App">
        <header>
          <h1>Youtube Together</h1>
        </header>
        <main>
          <form onSubmit={e => {e.preventDefault(); this.handleRegister(e)}}>
            <h2>Register</h2>
            <input name="username" type="text" onChange={this.handleAuthChange} value={username} />
            <input name="password" type="password" onChange={this.handleAuthChange} value={password} />
            <button>Register</button>
          </form>
          <form onSubmit={e => {e.preventDefault(); this.handleLogin(e)}}>
            <h2>Log In</h2>
            <input name="username" type="text" onChange={this.handleAuthChange} value={username} />
            <input name="password" type="password" onChange={this.handleAuthChange} value={password} />
            <button>Log In</button>
          </form>
        </main>
        <footer>
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
