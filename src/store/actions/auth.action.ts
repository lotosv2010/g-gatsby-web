import { LOGIN, LOGINSUCCESS, LOGINFAILED, LOADUSERSUCCESS } from "../const/auth.const"

export const login = (payload: any) => ({ type: LOGIN, payload })
export const loginSuccess = (payload: any) => ({ type: LOGINSUCCESS, payload })
export const loginFailed = (payload: any) => ({ type: LOGINFAILED, payload })
export const loadUserSuccess = (payload: any) => ({ type: LOADUSERSUCCESS, payload })