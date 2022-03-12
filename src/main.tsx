import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Providers } from './contexts'

ReactDOM.render(
  <Providers>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Providers>,
  document.getElementById('root')
)
