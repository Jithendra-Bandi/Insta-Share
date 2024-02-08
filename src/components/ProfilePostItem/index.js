import './index.css'

const ProfilePostItem = props => {
  const {each, altObject} = props
  return (
    <li className="profile-posts-li">
      <img
        src={each.image}
        alt={altObject.postImage}
        className="profile-posts-image"
      />
    </li>
  )
}

export default ProfilePostItem
