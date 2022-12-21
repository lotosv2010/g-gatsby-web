import * as React from "react"
import type { GatsbyBrowser } from "gatsby"
import { Provider } from "react-redux";
import axios from "axios"
import store from "./src/store/createStore";
import Layout from "./src/components/Layout"

axios.defaults.baseURL= "https://api.realworld.io/api"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return (
    <Layout>
      {element}
    </Layout>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}