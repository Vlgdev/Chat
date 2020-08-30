import React from 'react'
import { render } from 'react-dom'
import App from './App'
import MessagesProvider from './context/Messages/MessagesProvider'
import UserProvider from './context/User/UserProvider'
import { AlertProvider } from './context/Alert/AlertProvider'
import '@data/styles'
import '@data/images'

const app = (
  <UserProvider>
    <MessagesProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </MessagesProvider>
  </UserProvider>
)

render(app, document.getElementById('app'))
