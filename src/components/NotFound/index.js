import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const {history} = props
  const toHomeRoute = () => {
    history.push('/')
  }
  return (
    <div className="center">
      <div className="card align-center">
        <img
          src="https://res.cloudinary.com/dtxurasak/image/upload/v1707314186/pageNotFoundImage_vjhvsj.png"
          alt="page not found"
          className="not-found-image"
        />
        <h1>Page Not Found</h1>
        <p className="not-found-para">
          we are sorry, the page you requested could not be found
        </p>
        <p className="not-found-para">Please go back to homepage</p>
        <button type="button" onClick={toHomeRoute} className="blue-button">
          Home Page
        </button>
      </div>
    </div>
  )
}

export default withRouter(NotFound)
