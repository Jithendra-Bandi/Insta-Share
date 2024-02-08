import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'
import Header from '../Header'
import StoriesSlick from '../StoriesSlick'
import AppContext from '../../context/AppContext'
import './index.css'

const display = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    postsShowCase: display.loading,
    storiesShowCase: display.loading,
    storiesList: [],
    postsList: [],
    inputValue: '',
  }

  componentDidMount() {
    this.getStories('https://apis.ccbp.in/insta-share/stories')
    this.getPosts('https://apis.ccbp.in/insta-share/posts')
  }

  initializeSearchResults = searchInput => {
    this.setState({inputValue: searchInput})
    this.getPosts(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
    )
  }

  getPosts = async url => {
    this.setState({postsShowCase: display.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const postsList = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        comments: each.comments.map(eachComment => ({
          userId: eachComment.user_id,
          userName: eachComment.user_name,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
      }))
      this.setState({postsShowCase: display.success, postsList})
    } else this.setState({postsShowCase: display.failure})
  }

  getStories = async url => {
    this.setState({storiesShowCase: display.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const storiesList = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({storiesShowCase: display.success, storiesList})
    } else this.setState({storiesShowCase: display.failure})
  }

  failureDisplay = condition => {
    const {inputValue} = this.state
    let heightConditionalClass = ''
    let retryApi = this.getPosts
    if (condition === 'no-height') {
      heightConditionalClass = 'no-height-container'
      retryApi = this.getStories
    }
    let postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    if (condition === 'search')
      postsUrl = `https://apis.ccbp.in/insta-share/posts?search=${inputValue}`
    if (condition === 'no-height')
      postsUrl = 'https://apis.ccbp.in/insta-share/stories'
    return (
      <div className={`center ${heightConditionalClass}`}>
        <img
          src="https://res.cloudinary.com/dtxurasak/image/upload/v1707319064/failureTriangle_sxzjcu.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-para">Something went wrong. Please try again</p>
        <button
          type="button"
          className="blue-button"
          onClick={() => retryApi(`${postsUrl}`)}
        >
          Try again
        </button>
      </div>
    )
  }

  loadingDisplay = condition => {
    let heightConditionalClass = ''
    if (condition === 'no-height')
      heightConditionalClass = 'no-height-container'
    return (
      <div
        className={`loader-container center ${heightConditionalClass}`}
        testid="loader"
      >
        <Loader
          testid="loader"
          type="TailSpin"
          color="#4094EF"
          height={50}
          width={50}
        />
      </div>
    )
  }

  renderStories = () => {
    const {storiesList, storiesShowCase} = this.state
    switch (storiesShowCase) {
      case display.loading:
        return this.loadingDisplay('no-height')
      case display.success:
        return <StoriesSlick data={storiesList} />
      case display.failure:
        return this.failureDisplay('no-height')
      default:
        return null
    }
  }

  renderSuccessView = (condition) => {
    const showSearch =  condition === 'search'
    const {postsList} = this.state
    if (postsList.length > 0) {
      return (
        <>
          {showSearch && <h1 className="pad">Search Results</h1>}
          <ul className="posts-ul">
            {postsList.map(each => (
              <PostItem data={each} key={each.postId} />
            ))}
          </ul>
        </>
      )
    }
    return (
      <div className="center">
        <div className="card">
          <img
            src="https://res.cloudinary.com/dtxurasak/image/upload/v1707373605/noSearchResults_mep45h.png"
            alt="search not found"
            className="no-search-results-image"
          />
          <h1>Search Not Found</h1>
          <p className="light-color">Try different keyword or search again</p>
        </div>
      </div>
    )
  }

  renderPosts = separation => {
    const {postsShowCase} = this.state
    let condition = ''
    if (separation === 'search') condition = 'search'
    switch (postsShowCase) {
      case display.loading:
        return this.loadingDisplay('')
      case display.success:
        return this.renderSuccessView(condition)
      case display.failure:
        return this.failureDisplay(condition)
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {showSearch, searchInput} = value
          const {inputValue} = this.state
          if (searchInput !== inputValue)
            this.initializeSearchResults(searchInput)
          return showSearch ? (
            <div className="body-bg">
              <Header changeSearchInput={this.changeSearchInput} />
              <div className="posts-container">
                {this.renderPosts('search')}
              </div>
            </div>
          ) : (
            <div className="body-bg">
              <Header changeSearchInput={this.changeSearchInput} />
              <div className="margin-bottom">{this.renderStories()}</div>
              <hr className="home-hr small-device" />
              <div className="posts-container">{this.renderPosts('')}</div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home
