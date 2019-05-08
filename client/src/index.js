import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

import { ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT } from './constants'

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <App />
    </Router>
  </ActionCableProvider>,
  document.getElementById('root')
)
