import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileView from '../ProfileView'
import Header from '../Header'
import './index.css'

const display = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    profileShowCase: display.loading,
    profileData: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileShowCase: display.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        posts: data.profile.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        postsCount: data.profile.posts_count,
        stories: data.profile.stories.map(each => ({
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
        return <ProfileView type="myProfile" data={profileData} />
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

export default MyProfile
