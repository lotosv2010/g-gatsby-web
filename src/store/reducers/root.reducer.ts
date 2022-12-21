import { combineReducers } from "redux"
import authReducers from "./auth.reducer"
import articleReducers from "./article.reducer"

// reducer
export default combineReducers({
  auth: authReducers,
  articles: articleReducers
});