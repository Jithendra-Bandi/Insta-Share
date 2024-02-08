import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class PostItem extends Component {
  state = {isLike: false, noOfLikes: 0}

  componentDidMount() {
    const {data} = this.props
    this.setState({noOfLikes: data.likesCount})
  }

  likeChange = async () => {
    const {data} = this.props
    const {isLike} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${data.postId}/like`
    const bodyValue = {like_status: isLike}
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(bodyValue),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
  }

  onClickLikeLogo = () => {
    const {isLike, noOfLikes} = this.state
    if (isLike) {
      this.setState({isLike: false, noOfLikes: noOfLikes - 1}, this.likeChange)
    } else
      this.setState({isLike: true, noOfLikes: noOfLikes + 1}, this.likeChange)
  }

  render() {
    const {noOfLikes, isLike} = this.state
    const {data} = this.props
    const commentIcon = () => <FaRegComment />
    const likeIcon = () => <FcLike />
    const dislikeIcon = () => <BsHeart />
    const shareIcon = () => <BiShareAlt />
    return (
      <li className="card post-item-container">
        <div className="row pad upper-post">
          <div className="upper-post-logo-container">
            <img
              src={data.profilePic}
              alt="post author profile"
              className="post-item-logo"
            />
          </div>
          <Link className="nav-link black-color" to={`/users/${data.userId}`}>
            {data.userName}
          </Link>
        </div>
        <img
          src={data.postDetails.imageUrl}
          alt="post"
          className="post-item-image"
        />
        <div className="pad lower-post">
          <div className="row">
            {isLike && (
              <button
                type="button"
                testid="unLikeIcon"
                onClick={this.onClickLikeLogo}
              >
                {likeIcon()}
              </button>
            )}
            {!isLike && (
              <button
                type="button"
                testid="likeIcon"
                onClick={this.onClickLikeLogo}
              >
                {dislikeIcon()}
              </button>
            )}
            <button type="button">{commentIcon()}</button>
            <button type="button">{shareIcon()}</button>
          </div>
          <p className="bold post-like-count">{noOfLikes} likes</p>
          <p className="post-caption">{data.postDetails.caption}</p>
          <ul className="post-comment-ul">
            {data.comments.map(each => (
              <li className="post-comment-li" key={each.userId}>
                <p className="post-comment">
                  <span className="bold margin-right">{each.userName}</span>

                  {each.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="post-time-ago">{data.createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostItem
