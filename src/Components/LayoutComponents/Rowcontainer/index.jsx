import React from "react";
import Carousel from "react-multi-carousel";
import "Assets/css/index.css"
import axios from "axios";
import { image_url } from "Components/Data";
import { MovieContext } from "Context/MovieContext";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    paritialVisibilityGutter: 0
  }
};

const Rowcontainer = ({ deviceType, title, fetchUrl }) => {
  const { auth } = React.useContext(MovieContext);
    axios.defaults.headers.common = { Authorization: `Bearer ${auth.token}` };
  const [movies,setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchFavouritesMoviesData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response?.data?.results);
        setLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    };
    fetchFavouritesMoviesData();
  }, [fetchUrl]);

  return (
      <div className="container rowcontainer">
          <div className="row_title">
              <h3>{title}</h3>
          </div>
    {!loading ? <Carousel
      additionalTransfrom={0}
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="carousel-container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside
      renderDotsOutside={false}
      responsive={responsive}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
    >
      {movies?.map(movie => {
        return (
          <img
            className="carousel_img"
            src={`${image_url}${movie.backdrop_path}`} alt={movie.title} 
          />
        );
      })}
    </Carousel> : <>fetching movies...</>}
    </div>
  );
};

export default Rowcontainer;