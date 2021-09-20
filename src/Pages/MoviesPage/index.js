import React from "react";
import axios from "axios";
import { Select } from "antd";
import Request from "../../Components/Request";
import "./style.css";
import { base_url } from "../../Components/Constants";
import MovieDetails from "./details";
import DefaultLoader from "../../Components/Loader";
import LoginPage from "../Auth/login";
import RegisterPage from "../Auth/register";
import { MovieContext } from "../../Context/MovieContext";

const { Option } = Select;

function MovieHome() {
  const { auth, setAuthToken, movieState, dispatch} = React.useContext(MovieContext);
  const { movies ,initializedMovies, MoviesError, loadingMovies } = movieState
  const [selectedMovie, SetSelectedMovie] = React.useState(null);
  const [bannerMovie, setBannerMovie] = React.useState(null);
  const [movieDetailsVisible, setMovieDetailsVisible] = React.useState(false);

  console.log(movieState);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const viewMovieDetails = (movie) => {
    SetSelectedMovie(movie);
    setMovieDetailsVisible(true);
  };

  const closeMovieDetails = () => {
    SetSelectedMovie(null);
    setMovieDetailsVisible(false);
  };

  const fetchData = async () => {
    dispatch({
      type: "START_FETCHING_MOVIES",
    })
    const response = await axios.get(Request.fetchDefaultMovies);
    dispatch({
      type: "FETCH_MOVIES",
      payload: response.data.results
    })
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if(movies)
    setBannerMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
  }, [movies]);

  return !initializedMovies ? (
    <DefaultLoader />
  ) : (
    <div className="container-fluid p-0">
      {movieDetailsVisible && (
        <MovieDetails
          selectedMovie={selectedMovie}
          isVisible={movieDetailsVisible}
          closeModal={closeMovieDetails}
        />
      )}
      {/* <LoginPage/> */}
      <div className="row">
        <div
          className="banner_container"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${base_url}${bannerMovie?.backdrop_path})`,
            backgroundposition: "center center",
          }}
        >
          <div className="banner_contents">
            <h1 className="banner_title">{bannerMovie?.title}</h1>
            <div className="banner_buttons">
              <button
                className="banner_button"
                onClick={() => viewMovieDetails(bannerMovie)}
              >
                Details
              </button>
              <button className="banner_button">My List</button>
              <h1 className="banner_description">
                {truncate(bannerMovie?.overview, 150)}
              </h1>
            </div>
          </div>

          <div className="banner_fadeBottom"></div>
        </div>
      </div>
      <div className="row card_container">
        <div className="col-lg-12">
          <div
          className="card_container_header"
          >
            <span style={{ fontSize: "1.2rem" }}>CapitalMovies</span>
            <span>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={(v) => console.log(v)}
              >
                <Option value="all">All</Option>
                <Option value="popular">Popular</Option>
                <Option value="latest">Latest</Option>
                <Option value="favourites">Favourites</Option>
              </Select>
            </span>
          </div>
        </div>
        {movies.map((movie) => (
          <div className="col-lg-3 mb-3 movie_card" key={movie.id}>
            <img src={`${base_url}${movie.backdrop_path}`} alt={movie.title} />
            <div className="movie_card_meta">
              <span
                style={{ cursor: "pointer", fontSize: ".8rem" }}
                onClick={() => viewMovieDetails(movie)}
              >
                {movie?.title || movie?.name || movie?.original_name}
              </span>{" "}
              <span style={{ cursor: "pointer" }}>+</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieHome;
