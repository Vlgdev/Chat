import React, { useReducer } from 'react'
import AlertContext from './AlertContext'
import { alertReducer } from './alertReducer'
import { SHOW_ALERT, HIDE_ALERT } from '../types'

/**
 * Sends alert, showAlert and hideAlert to all its children
 * @component
 */
export const AlertProvider = ({children}) => {
  const initialState = {
    visible: false
  }
  const [alert, dispatch] = useReducer(alertReducer, initialState)

  /**
   * This function shows an alert
   * @param {Object} values - Include type of alert and message
   */
  const showAlert = ({type, message}) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        type, message
      }
    })
  }

  /**
   * This function hides an alert
   */
  const hideAlert = () => {
    dispatch({type: HIDE_ALERT})
  }

  return (
    <AlertContext.Provider value={{
      alert,
      showAlert,
      hideAlert
    }}>
      {children}
    </AlertContext.Provider>
  )
}