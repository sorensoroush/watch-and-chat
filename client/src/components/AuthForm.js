import React from 'react'

const AuthForm = props => {
  const { username, password } = props.authData
  return (
    <>
      {props.loggedIn
      ?
        null
      :
      <>
        <form onSubmit={e => {e.preventDefault(); props.handleSubmit(e)}}>
          <h2>{props.title}</h2>
          <input name="username" type="text" onChange={props.handleChange} value={username} />
          <input name="password" type="password" onChange={props.handleChange} value={password} /> <br />
          <button>{props.title}</button>
        </form> <br />
        <button onClick={props.swapForm}>{props.title === 'Log In' ? 'Register' : 'Log In' }</button>
      </>
      }
    </>
  )
}

export default AuthForm
