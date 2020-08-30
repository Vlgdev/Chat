import React, { useReducer, useEffect } from 'react'
import MessagesContext from './messagesContext'
import messagesReducer from './messagesReducer'
import {
  FETCH_MESSAGES,
  SHOW_LOADER,
  HIDE_LOADER,
  UPDATE_MESSAGES,
} from '../types'
import { db } from '../../services/firebase'

/**
 * Sends messages, loading, addMessage and loadMessages to all its children
 * @component
 */
const MessagesProvider = ({ children }) => {
  const initialState = {
    messages: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(messagesReducer, initialState)

  useEffect(() => {
    scrollWindowToBottom()
  }, [state.messages])

  /**
   * This function add message to the database
   * @async
   * @param {string} body 
   * @param {string} uid - User's id
   * @return {Promise}
   */
  const addMessage = async (body, uid) => {
    const message = {
      body,
      uid,
    }
    try {
      await db.ref('messages').push({
        ...message,
      })
    } catch(e) {
      throw new Error(e.message)
    }
    
  }

  /**
   * This function load messages from database
   * @async
   * @return {Promise}
   */
  const loadMessages = async () => {
    dispatch({ type: SHOW_LOADER })
    let messages = []
    try {
      const response = await db.ref('messages').once('value')

      if (response) {
        response.forEach((snap) => {
          messages.push({ ...snap.val(), id: snap.key })
        })
      }

      dispatch({
        type: FETCH_MESSAGES,
        payload: messages,
      })
      dispatch({ type: HIDE_LOADER })
      updateListener()
    } catch (e) {
      throw new Error(e.message)
    }
  }

  /**
   * This function connets a listener that if there were changes in the database loads these changes
   */
  const updateListener = () => {
    db.ref('messages').on('value', (snapshot) => {
      let messages = []
      snapshot.forEach((snap) => {
        messages.push({ ...snap.val(), id: snap.key })
      })
      dispatch({
        type: UPDATE_MESSAGES,
        payload: messages,
      })
    })
  }

  /**
   * This function scroll chat window to bottom when new message is added
   */
  const scrollWindowToBottom = () => {
    const chat = document.querySelector('.chat-window')
    if (chat) chat.scrollTop = chat.scrollHeight
  }

  return (
    <MessagesContext.Provider
      value={{
        messages: state.messages,
        loading: state.loading,
        addMessage,
        loadMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export default MessagesProvider
