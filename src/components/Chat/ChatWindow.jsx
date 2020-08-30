import React, { useContext } from 'react'
import ChatLoader from './ChatLoader'
import MessagesContext from '../../context/Messages/messagesContext'
import UserContext from '../../context/User/UserContext'

/**
 * This component displays messages
 * @component
 */
const ChatWindow = () => {
  const { loading, messages } = useContext(MessagesContext)
  const {uid} = useContext(UserContext)
  return (
    <div className="chat-window">
      {loading ? (
        <ChatLoader />
      ) : messages.length ? (
        messages.map((message) => {
          const classes = ['chat-message']
          if (message.uid === uid) classes.push('current-user')
          return (
          <div className={classes.join(' ')} key={message.id}>
            {message.body}
          </div>
        )})
      ) : (
        <div className="chat-note">Сообщений пока нет. Начните общение первым!</div>
      )}
    </div>
  )
}

export default ChatWindow
