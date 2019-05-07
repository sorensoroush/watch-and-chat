import React, { Component }  from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import './App.css'
import decode from 'jwt-decode'

import { loginUser, registerUser } from './services/api-helper'

import AuthForm from './components/AuthForm'

class App extends Component {
  state = {
    loggedIn: false,
    isRegistered: true,
    authData: {
      username: '',
      password: ''
    }
  }

  handleAuthChange = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      authData: {
        ...prevState.authData,
        [name]: value
      }
    }))
  }

  handleRegister = async event => {
    const resp = await registerUser(this.state.authData)
    this.handleLogin(event)
  }

  handleLogin = async event => {
    const token = await loginUser(this.state.authData)
    if (token.token) {
      const userData = decode(token.token)
      localStorage.setItem('token', token.token)
      this.setState({
        loggedIn: true,
        authData: {
          username: '',
          password: ''
        }
      })
    } else {
      alert(token.error)
      this.setState(prevState => ({
        authData: {
          ...prevState.authData,
          password: ''
        }
      }))
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.setState({loggedIn: false})
  }

  swapForm = () => {
    this.setState(prevState => ({isRegistered: !prevState.isRegistered}))
  }

  componentDidMount() {
    if (localStorage.getItem('token')) this.setState({logginIn: true})
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Watch & Chat</h1>
        </header>
        <main>
          <div className="auth-forms">
            {this.state.isRegistered 
            ?
              <AuthForm title="Log In" handleSubmit={this.handleLogin} handleLogout={this.handleLogout} handleChange={this.handleAuthChange} authData={this.state.authData} loggedIn={this.state.loggedIn} swapForm={this.swapForm} />
            :
              <AuthForm title="Register" handleSubmit={this.handleLogin} handleLogout={this.handleLogout} handleChange={this.handleAuthChange} authData={this.state.authData} loggedIn={this.state.loggedIn} swapForm={this.swapForm} />
            }
          </div>
          
        </main>
        <footer>
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
