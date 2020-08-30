import { SIGN_IN, SIGN_OUT } from "../types"

const handlers = {
  DEFAULT: state => state,
  [SIGN_IN]: (state, {payload}) => ({
    uid: payload, authenticated: true
  }),
  [SIGN_OUT]: () => ({
    authenticated: false
  })
}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @return {Object} - {uid?: string, authenticated: boolean}
 */
export const userReducer = (state, action) => {
  const handle = handlers[action.type] || handle.DEFAULT
  return handle(state, action)
}