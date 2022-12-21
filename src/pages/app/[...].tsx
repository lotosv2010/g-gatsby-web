import React from "react"
import { Router } from "@reach/router"
import Create from "../../components/Create"
import Profile from "../../components/Profile"
import Settings from "../../components/Settings"
import PrivateRoute from "../../components/PrivateRoute"

const App = () => {
  return (
    <Router basepath="/app">
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/create" component={Create} />
    </Router>
  )
}

export default App