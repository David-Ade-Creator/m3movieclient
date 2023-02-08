import React from "react";
import Carousel from "react-multi-carousel";
import "Assets/css/index.css"
import axios from "axios";
import { image_url } from "Components/Data";
import { MovieContext } from "Context/MovieContext";
import MovieDetails from "Pages/HomePage/details";
import ButtonGroup from "../Button-group";

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
  const [movieDetailsVisible, setMovieDetailsVisible] = React.useState(false);
  const [selectedMovie, SetSelectedMovie] = React.useState(null);

  const viewMovieDetails = (movie) => {
    SetSelectedMovie(movie);
    setMovieDetailsVisible(true);
  };

  const closeMovieDetails = () => {
    SetSelectedMovie(null);
    setMovieDetailsVisible(false);
  };

  React.useEffect(() => {
    const fetchFavouritesMoviesData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response?.data?.results);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error.response)
      }
    };
    fetchFavouritesMoviesData();
   return ()=> {
    fetchFavouritesMoviesData()
   }
  }, [fetchUrl]);

  return (
      <div className="container rowcontainer">
        {movieDetailsVisible && <MovieDetails
          selectedMovie={selectedMovie}
          isVisible={movieDetailsVisible}
          closeModal={closeMovieDetails}
        />}
          <div className="row_title">
              <h3>{title}</h3>
          </div>
    {!loading ? <div className="slides_container"><Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="carousel-container"
      customButtonGroup={<ButtonGroup />}
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={true}
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
          key={movie.id}
          onClick={() => viewMovieDetails(movie)}
            className="carousel_img"
            src={`${image_url}${movie.backdrop_path}`} alt={movie.title} 
          />
        );
      })}
    </Carousel></div> : <>fetching movies...</>}
    </div>
  );
};

export default Rowcontainer;