import React from 'react'

const AuthForm = props => {
  const { username, password } = props.authData
  return (
    <>
      {props.loggedIn
      ?
        <button onClick={props.handleLogout}>Log out</button>
      :
      <>
        <form onSubmit={e => {e.preventDefault(); props.handleSubmit(e)}}>
          <h2>{props.title}</h2>
          <input name="username" type="text" onChange={props.handleChange} value={username} />
          <input name="password" type="password" onChange={props.handleChange} value={password} />
          <button>{props.title}</button>
        </form> <br />
        <button onClick={props.swapForm}>{props.title === 'Log In' ? props.title : 'Log In'}</button>
      </>
      }
    </>
  )
}

export default AuthForm
