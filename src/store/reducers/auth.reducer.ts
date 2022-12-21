import { LOGINFAILED, LOGINSUCCESS, LOADUSERSUCCESS } from "../const/auth.const"

// default state
const defaultState = {}

// reducer
const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case LOGINSUCCESS:
    case LOADUSERSUCCESS:
      return {
        success: true,
        user: action.payload
      }
    case LOGINFAILED:
      return {
        success: false,
        errors: action.payload
      }
    default:
      return state
  }
}

export default reducer