import { LOADARTICLESSUCCESS } from "../const/article.conts"

// default state
const defaultState: any = null

// reducer
const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case LOADARTICLESSUCCESS:
      return action.payload
    default:
      return state
  }
}

export default reducer