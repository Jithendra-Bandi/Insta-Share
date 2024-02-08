import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactSlick = props => {
  const {data} = props
  return (
    <div className="main-container">
      <div className="slick-container">
        <Slider {...settings}>
          {data.map(each => (
            <div key={each.userId}>
              <div className="slick-item">
                <img
                  className="story-logo-image"
                  src={each.storyUrl}
                  alt="user story"
                />
              </div>
              <p>{each.userName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ReactSlick
