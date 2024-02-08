import Slider from 'react-slick'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ProfilePostItem from '../ProfilePostItem'
import ProfileStoryItem from '../ProfileStoryItem'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

const ProfileView = props => {
  const {data, type} = props
  let altObject
  if (type === 'myProfile') {
    altObject = {
      profileImage: 'my profile',
      storyImage: 'my story',
      postImage: 'my post',
    }
  } else {
    altObject = {
      profileImage: 'user profile',
      storyImage: 'user story',
      postImage: 'user post',
    }
  }
  return (
    <div className="profile-container pad">
      <h1 className="margin-left small-device">{data.userName}</h1>

      <ul className="small-device around">
        <li className="card align-center">
          <img
            src={data.profilePic}
            alt={altObject.profileImage}
            className="profile-logo margin-right"
          />
        </li>
        <li className="card align-center">
          <p className="bold no-margin">{data.postsCount}</p>
          <p className="no-margin">posts</p>
        </li>
        <li className="card align-center">
          <p className="bold no-margin">{data.followersCount}</p>
          <p className="no-margin">followers</p>
        </li>
        <li className="card align-center">
          <p className="bold no-margin">{data.followingCount}</p>
          <p className="no-margin">following</p>
        </li>
      </ul>
      <div className="large-device row margin-right">
        <img
          src={data.profilePic}
          alt={altObject.profileImage}
          className="profile-logo margin-right"
        />
        <ul>
          <li>
            <h1 className="no-margin">{data.userName}</h1>
          </li>
          <li className="row no-margin">
            <p className="profile-count-value">{data.postsCount}</p>
            <p>posts</p>
            <p className="profile-count-value">{data.followersCount}</p>
            <p>followers</p>
            <p className="profile-count-value">{data.followingCount}</p>
            <p>following</p>
          </li>
          <li>
            <p className="bold no-margin">{data.userId}</p>
          </li>
          <li>
            <p className="no-margin">{data.userBio}</p>
          </li>
        </ul>
      </div>

      <div className="small-device">
        <p className="bold">{data.userId}</p>
        <p>{data.userBio}</p>
      </div>
      <ul className="pad margin-top margin-bottom">
        <Slider {...settings}>
          {data.stories.map(each => (
            <ProfileStoryItem key={each.id} each={each} altObject={altObject} />
          ))}
        </Slider>
      </ul>
      <hr className="profile-hr" />
      <div className="pad">
        <div className="row">
          <BsGrid3X3 className="margin-right" size={25} />
          <h1>Posts</h1>
        </div>
        {data.posts.length === 0 ? (
          <div className="small-height card">
            <div className="align-center card">
              <BiCamera className="camera-icon" size={50} />
              <h1>No Posts Yet</h1>
            </div>
          </div>
        ) : (
          <ul className="profile-posts-ul">
            {data.posts.map(each => (
              <ProfilePostItem
                key={each.id}
                each={each}
                altObject={altObject}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProfileView
