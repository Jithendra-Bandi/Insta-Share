import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorText: '', showError: false}

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const credentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else this.setState({errorText: data.error_msg, showError: true})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) return <Redirect to="/" />
    const {username, password, errorText, showError} = this.state
    return (
      <div className="center">
        <div className="login-card">
          <div className="login-image-container">
            <img
              src="https://res.cloudinary.com/dtxurasak/image/upload/v1707214241/loginRouteImage_c1h3eo.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <form className="card login-form" onSubmit={this.onSubmit}>
            <div className="login-logo-container">
              <img
                src="https://res.cloudinary.com/dtxurasak/image/upload/v1707216315/instaShareLogo_nd4fkw.png"
                alt="website logo"
                className="login-logo"
              />
              <h1 className="login-logo-name">Insta Share</h1>
            </div>
            <div className="login-input-container">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                value={username}
                className="login-input"
                onChange={this.changeUsername}
                placeholder="Username"
              />
            </div>
            <div className="login-input-container">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                className="login-input"
                onChange={this.changePassword}
                placeholder="Password"
              />
            </div>
            {showError && <p className="login-error-text">{errorText}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
