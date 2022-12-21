import React from "react"
import { navigate } from "gatsby"
import useLogin from "../hooks/useLogin"

const PrivateRoute = ({ component: Component, location, ...rest }: any) => {
  const [isLogin, loading] = useLogin()
  if(loading) return null
  if (!isLogin && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute