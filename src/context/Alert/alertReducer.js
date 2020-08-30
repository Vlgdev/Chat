import { SHOW_ALERT, HIDE_ALERT } from "../types"

const handlers = {
  DEFAULT: state => state,
  [SHOW_ALERT]: (state, {payload}) => ({
    visible: true,
    ...payload
  }),
  [HIDE_ALERT]: state => ({visible: false})
}

/**
 * 
 * @param {Object} state - Previos state
 * @param {Object} action - {type, payload}
 * @return {Object} - Returns the new state for the alert. visible: boolean, type?: string, message?: string 
 */
export const alertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}