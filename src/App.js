import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import AppContext from './context/AppContext'
import './App.css'

class App extends Component {
  state = {showSearch: false, searchInput: ''}

  clearSearchData = () => this.setState({showSearch: false, searchInput: ''})

  changeSearchInput = value =>
    this.setState({searchInput: value, showSearch: true})

  render() {
    const {showSearch, searchInput} = this.state
    return (
      <AppContext.Provider
        value={{
          searchInput,
          showSearch,
          clearSearchData: this.clearSearchData,
          changeSearchInput: this.changeSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}
export default App
