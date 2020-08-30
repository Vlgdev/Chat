import { ADD_MESSAGE, FETCH_MESSAGES, SHOW_LOADER, HIDE_LOADER, UPDATE_MESSAGES } from '../types'

const handlers = {
  DEFAULT: (state) => state,
  [ADD_MESSAGE]: (state, { payload }) => ({
    ...state,
    messages: [...state.messages, payload]
  }),
  [FETCH_MESSAGES]: (state, {payload}) => ({
    ...state,
    messages: [...payload]
  }),
  [SHOW_LOADER]: state => ({
    ...state,
    loading: true
  }),
  [HIDE_LOADER]: state => ({
    ...state,
    loading: false
  }),
  [UPDATE_MESSAGES]: (state, { payload }) => ({
    ...state,
    messages: payload
  })
}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @return {Object} - {messages[], loading: boolean}
 */
const messagesReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}

export default messagesReducer
