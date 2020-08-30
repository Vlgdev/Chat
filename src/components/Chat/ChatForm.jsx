import React, { useState, useContext } from 'react'
import MessagesContext from '../../context/Messages/messagesContext'
import UserContext from '../../context/User/UserContext'
import AlertContext from '../../context/Alert/AlertContext'

/**
 * This component is responsible for entering a message
 * @component
 */
const ChatForm = () => {
  const [value, setValue] = useState('')
  const { loading, addMessage } = useContext(MessagesContext)
  const {uid} = useContext(UserContext)
  const { showAlert, hideAlert} = useContext(AlertContext)

  /**
   * This function checks the validity of the message. If all is well, it sends it to the server. If an error has occurred on the server, an error message will be displayed
   */
  const submitHandler = () => {
    event.preventDefault()

    if (!value.trim() || loading) return

      addMessage(value.trim(), uid).then(() => {
        setValue('')
      }).catch(e => {
        showAlert({
          type: 'error',
          message: 'Не удалось отправить сообщение'
        })
        setTimeout(hideAlert, 3000)
      })
  }

  /**
   * This function changes the value in state when you enter text in the field
   */
  const changeHandler = e => {
    if (loading) return false
    setValue(e.target.value)
  }

  return (
    <form className="chat-form" onSubmit={() => submitHandler()}>
      <input
        value={value}
        className="input chat-input"
        type="text"
        placeholder="Введите сообщение"
        onChange={changeHandler}
      />
      <button className="btn chat-btn" type="submit" disabled={loading}>
        Отправить
      </button>
    </form>
  )
}

export default ChatForm
