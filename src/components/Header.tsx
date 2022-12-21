import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOADUSER } from '../store/const/auth.const'

const Login = ({ username }: any) => {
  return <>
    <li className="nav-item">
      <a className="nav-link"> <i className="ion-compose" />&nbsp;New Article </a>
    </li>
    <li className="nav-item">
      <a className="nav-link"> <i className="ion-gear-a" />&nbsp;Settings </a>
    </li>
    <li className="nav-item">
      <a className="nav-link">{username}</a>
    </li>
  </>
}

const Logout = () => {
  return <>
    <li className="nav-item">
      <a className="nav-link">Sign in</a>
    </li>
    <li className="nav-item">
      <a className="nav-link">Sign up</a>
    </li>
  </>
}

function Header() {
  const dispatch = useDispatch()
  const auth = useSelector((state:any) => state.auth)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      dispatch({
        type: LOADUSER,
        payload: token
      })
    }
  }, [])
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active">Home</a>
          </li>
          { auth.success ? <Login username={auth.user.username} /> : <Logout />}
        </ul>
      </div>
    </nav>

  )
}

export default Header