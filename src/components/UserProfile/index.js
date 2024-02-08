import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileView from '../ProfileView'
import './index.css'
import Header from '../Header'

const display = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    profileShowCase: display.loading,
    profileData: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileShowCase: display.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const profileData = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        posts: data.user_details.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        postsCount: data.user_details.posts_count,
        stories: data.user_details.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }
      this.setState({profileShowCase: display.success, profileData})
    } else this.setState({profileShowCase: display.failure})
  }

  failureDisplay = () => (
    <div className="center">
      <div className="card">
        <img
          src="https://res.cloudinary.com/dtxurasak/image/upload/v1707393945/failureImage_xdpvc0.png"
          alt="failure view"
          className="failure-fox-image"
        />
        <p className="failure-para">Something went wrong. Please try again</p>
        <button
          type="button"
          className="blue-button align-self"
          onClick={this.getProfileDetails}
        >
          Try again
        </button>
      </div>
    </div>
  )

  loadingDisplay = () => (
    <div testid="loader" className="loader-container center">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileData, profileShowCase} = this.state
    switch (profileShowCase) {
      case display.loading:
        return this.loadingDisplay()
      case display.success:
        return <ProfileView type="userProfile" data={profileData} />
      case display.failure:
        return this.failureDisplay()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="body-bg">
        <Header />
        <div className="stories-container">{this.renderProfile()}</div>
      </div>
    )
  }
}

export default UserProfile
