import React, { useContext, useEffect } from 'react'
import ChatWindow from './components/Chat/ChatWindow'
import ChatForm from './components/Chat/ChatForm'
import AppLoader from './components/App/AppLoader'
import Alert from './components/Alert'
import MessagesContext from './context/Messages/messagesContext'
import AlertContext from './context/Alert/AlertContext'
import UserContext from './context/User/UserContext'

/**
 * Main component
 * @component
 */
const App = () => {
  const { loadMessages } = useContext(MessagesContext)
  const { user, userWatcher } = useContext(UserContext)
  const { showAlert, hideAlert } = useContext(AlertContext)
  
  useEffect(() => {
    try {
      userWatcher()
    } catch (e) {
      showAlert({
        type: 'error',
        message: 'Произошла ошибка при входе. Повторите попытку',
      })
      setTimeout(hideAlert, 6000)
    }
    loadMessages().catch((e) => {
      showAlert({
        type: 'error',
        message: 'Произошла ошибка при загрузке данных. Повторите попытку',
      })
      setTimeout(hideAlert, 6000)
    })
  }, [])

  return (
    <>
      <Alert />
      {user.authenticated ? (
        <div className="container">
          <ChatWindow />
          <ChatForm />
        </div>
      ) : (
        <AppLoader />
      )}
    </>
  )
}

export default App
