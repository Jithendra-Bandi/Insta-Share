import './index.css'

const ProfileStoryItem = props => {
  const {each, altObject} = props
  return (
    <li className="slick-item">
      <img
        className="story-logo-image"
        src={each.image}
        alt={altObject.storyImage}
      />
    </li>
  )
}

export default ProfileStoryItem
