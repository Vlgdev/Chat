import React, { useReducer } from 'react'
import UserContext from './UserContext'
import { userReducer } from './userReducer'
import { auth } from '../../services/firebase'
import { SIGN_IN, SIGN_OUT } from '../types'

/**
 * Sends user, uid, userWatcher and loadMessages to all its children
 * @component
 */
const UserProvider = ({ children }) => {
  const initialState = {
    authenticated: false,
  }
  const [state, dispatch] = useReducer(userReducer, initialState)

  /**
   * Watches user authorization change
   */
  const userWatcher = () => {
    try {
      auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: SIGN_IN,
            payload: user.uid,
          })
        } else {
          dispatch({
            type: SIGN_OUT,
          })
          signIn()
        }
      })
      signIn()
    } catch (e) {
      throw new Error()
    }
  }

  /**
   * Authorizes the user anonymously
   */
  const signIn = () => {
    auth()
      .signInAnonymously()
      .catch((e) => {
        throw new Error(e.message)
      })
  }

  return (
    <UserContext.Provider
      value={{
        uid: state.uid,
        user: state,
        userWatcher
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
