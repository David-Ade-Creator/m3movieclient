import React from "react";
import { base_url } from "./Constants";
import axios from "axios";
import {ExclamationCircleOutlined,PlusOutlined,CheckOutlined} from "@ant-design/icons";
import { MovieContext } from "../Context/MovieContext";
import MovieDetails from "../Pages/MoviesPage/details";
import { message } from "antd";

function MovieList({ movies, myList }) {
  const { dispatch, auth } = React.useContext(MovieContext);
  const [movieDetailsVisible, setMovieDetailsVisible] = React.useState(false);
  const [selectedMovie, SetSelectedMovie] = React.useState(null);
  const [favouriteMovies,setFavouriteMovies] = React.useState(null);

  const user = auth.data?._doc;

  const viewMovieDetails = (movie) => {
    SetSelectedMovie(movie);
    setMovieDetailsVisible(true);
  };

  const closeMovieDetails = () => {
    SetSelectedMovie(null);
    setMovieDetailsVisible(false);
  };

  const addToFavourites = async (movie) => {
    try {
      const response = await axios.post(
        `http://localhost:1100/api/m3/favourites`,
        movie
      );
      const resMovie = response.data.data;
      const isAvailable = favouriteMovies.some(movie => movie.id === resMovie.id);
      if(isAvailable){
        setFavouriteMovies([...favouriteMovies.filter(movie => movie.id !== resMovie.id)])
      }else{
          setFavouriteMovies([...favouriteMovies,resMovie]);
          message.success("Added to favourites");
        }
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  React.useEffect(() => {
    const fetchFavouritesMoviesData = async () => {
      if (!user) return;
      try {
        dispatch({
          type: "START_FETCH_FAVOURITES",
        });
        const response = await axios.get(
          `http://localhost:1100/api/m3/favourites`
        );
        setFavouriteMovies(response.data);
      } catch (error) {
        console.log(error.response)
      }
    };
    fetchFavouritesMoviesData();
  }, [dispatch, user]);

  return (
    <div className="row card_container">
      {movieDetailsVisible && (
        <MovieDetails
          selectedMovie={selectedMovie}
          isVisible={movieDetailsVisible}
          closeModal={closeMovieDetails}
        />
      )}
      {myList ? <>
        {favouriteMovies?.map((movie) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3 movie_card"
          key={movie.id}
         
        >
          <img src={`${base_url}${movie.backdrop_path}`} alt={movie.title}  onClick={() => viewMovieDetails(movie)} />
          <div className="movie_card_meta">
            <span
              style={{ cursor: "pointer", fontSize: ".8rem", alignItems:"center" }}
              onClick={() => viewMovieDetails(movie)}
            >
              <ExclamationCircleOutlined style={{margin:"0 .5rem 0 0",display:"flex"}}/>
            </span><span
              style={{ cursor: "pointer", fontSize: ".8rem", alignItems:"center" }}
              onClick={() => viewMovieDetails(movie)}
            >
             {movie?.title || movie?.name || movie?.original_name}
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => addToFavourites(movie)}
            >
             {favouriteMovies?.some(singleMovie => singleMovie.id === movie.id) ? < CheckOutlined style={{marginBottom:".4rem"}}/> : <PlusOutlined style={{margin:".4rem .5rem .4rem 0",display:"flex"}} />}
            </span>
          </div>
        </div>
      ))}
      </> : <>{movies?.map((movie) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3 movie_card"
          key={movie.id}
         
        >
          <img src={`${base_url}${movie.backdrop_path}`} alt={movie.title}  onClick={() => viewMovieDetails(movie)} />
          <div className="movie_card_meta">
            <span
              style={{ cursor: "pointer", fontSize: ".8rem", alignItems:"center" }}
              onClick={() => viewMovieDetails(movie)}
            >
              <ExclamationCircleOutlined style={{margin:"0 .5rem 0 0",display:"flex"}}/>
            </span><span
              style={{ cursor: "pointer", fontSize: ".8rem", alignItems:"center" }}
              onClick={() => viewMovieDetails(movie)}
            >
             {movie?.title || movie?.name || movie?.original_name}
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => addToFavourites(movie)}
            >
             {favouriteMovies?.some(singleMovie => singleMovie.id === movie.id) ? < CheckOutlined style={{marginBottom:".4rem"}}/> : <PlusOutlined style={{margin:".4rem .5rem .4rem 0",display:"flex"}} />}
            </span>
          </div>
        </div>
      ))}</>}
      
    </div>
  );
}

export default MovieList;
