import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {IoIosCloseCircle} from 'react-icons/io'
import AppContext from '../../context/AppContext'
import './index.css'

class Header extends Component {
  state = {showDropdown: false, searchValue: '', showSearchBox: false}

  menuIcon = () => <GiHamburgerMenu size={25} />

  searchIcon = () => <FaSearch />

  closeIcon = () => <IoIosCloseCircle size={25} />

  changeSearch = event => this.setState({searchValue: event.target.value})

  onClickSearch = () => {
    this.setState(prev => ({showSearchBox: !prev.showSearchBox}))
    this.toggleMenu()
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  toggleMenu = () => this.setState(prev => ({showDropdown: !prev.showDropdown}))

  render() {
    const {showDropdown, searchValue, showSearchBox} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {changeSearchInput, clearSearchData} = value
          const clearSearch = () => {
            this.setState({searchValue: ''})
            clearSearchData()
          }
          const onClickSearchIcon = () => {
            changeSearchInput(searchValue)
            const {history} = this.props
            history.push('/')
          }
          return (
            <div className="header">
              <nav className="between pad">
                <div className="row nav-logo-container">
                  <Link to="/" className="nav-link">
                    <img
                      src="https://res.cloudinary.com/dtxurasak/image/upload/v1707216315/instaShareLogo_nd4fkw.png"
                      alt="website logo"
                      className="nav-logo"
                      onClick={clearSearchData}
                    />
                  </Link>
                  <h1 className="nav-logo-text">Insta Share</h1>
                </div>
                <button
                  type="button"
                  onClick={this.toggleMenu}
                  className="nav-small-icon-button"
                >
                  {this.menuIcon()}
                </button>

                <ul className="nav-large-container ">
                  <li>
                    <div className="row search-div">
                      <input
                        type="search"
                        className="nav-input-search"
                        placeholder="Search Caption"
                        value={searchValue}
                        onChange={this.changeSearch}
                      />
                      <button
                        type="button"
                        onClick={onClickSearchIcon}
                        className="nav-search-icon-button"
                        testid="searchIcon"
                      >
                        {this.searchIcon()}
                      </button>
                    </div>
                  </li>
                  <li>
                    <Link to="/" onClick={clearSearch} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      onClick={clearSearch}
                      className="nav-link"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={this.onLogout}
                      type="button"
                      className="blue-button pad"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
              {showDropdown && (
                <div className="between pad">
                  <ul className="around nav-dropdown-links">
                    <li>
                      <Link to="/" onClick={clearSearch} className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={this.onClickSearch}>
                        <big>Search</big>
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/my-profile"
                        onClick={clearSearch}
                        className="nav-link"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={this.onLogout}
                        type="button"
                        className="blue-button pad"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  <button type="button" onClick={this.toggleMenu}>
                    {this.closeIcon()}
                  </button>
                </div>
              )}
              {showSearchBox && (
                <div className="text-align-center">
                  <div className="row search-div">
                    <input
                      type="search"
                      className="nav-input-search-small nav-input-search"
                      placeholder="Search Caption"
                      value={searchValue}
                      onChange={this.changeSearch}
                    />
                    <button
                      type="button"
                      onClick={onClickSearchIcon}
                      className="nav-search-icon-button"
                      testid="searchIcon"
                    >
                      {this.searchIcon()}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default withRouter(Header)
