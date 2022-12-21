import * as React from "react"
import type { GatsbySSR } from "gatsby"
import { Provider } from "react-redux";
import store from "./src/store/createStore";
import Layout from "./src/components/Layout"

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
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