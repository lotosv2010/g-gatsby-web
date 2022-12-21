import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { navigate, HeadFC } from "gatsby"
import * as auth from "../store/actions/auth.action"
import useInput from '../hooks/useInput'

function Login(props: any) {
  const { login, auth } = props;
  const email = useInput('robinv2010@163.com')
  const password = useInput('123456123456')

  if(auth.success) {
    navigate('/')
    return null
  }

  const displayErrors = () => {
    if(auth.errors) {
      return auth.errors.map((error: string) => (<li key={error}>{error}</li>))
    }
    return null
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const passwordValue = password.input.value
    const emailValue = email.input.value
    login({
      user: {
        email: emailValue,
        password: passwordValue
      }
    })
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <ul className="error-messages">
              { displayErrors() }
            </ul>
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Email" {...email.input} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password" {...password.input} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state: any) => ({
  auth: state.auth
});
// bindActionCreators
const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators(auth, dispatch),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login);

export const Head: HeadFC = () => <title>Login Page</title>
