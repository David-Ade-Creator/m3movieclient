import { message } from "antd";
import axios from "axios";
import { base_url } from "Components/Data";
import { MovieContext } from "Context/MovieContext";
import React from "react";

function AddFavourite({ movie }) {
  const { auth, dispatch, movieState } = React.useContext(MovieContext);
  axios.defaults.headers.common = { Authorization: `Bearer ${auth.token}` };
  const user = auth.data?._doc;

  const {favouriteMovies,favourtieMoviesLoaded} = movieState;

  const addToFavourites = async () => {
    try {
      const response = await axios.post(
        `${base_url}/api/m3/favourites`,
        movie
      );
      const resMovie = response.data.data;
      const isAvailable = favouriteMovies.some(movie => movie.id === resMovie.id);
      if(isAvailable){
        dispatch({
            type: "FETCHED_FAVOURITE_MOVIES",
            payload : [...favouriteMovies.filter(movie => movie.id !== resMovie.id)]
          });
      }else{
        dispatch({
            type: "FETCHED_FAVOURITE_MOVIES",
            payload : [...favouriteMovies,resMovie]
          });
          message.success("Added to favourites");
        }
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  React.useEffect(() => {
    const fetchFavouritesMoviesData = async () => {
      if (!user) return;
      if(favourtieMoviesLoaded) return;
      try {
        const response = await axios.get(`${base_url}/api/m3/favourites`);
        dispatch({
            type: "FETCHED_FAVOURITE_MOVIES",
            payload : response.data
          });
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFavouritesMoviesData();
  }, [dispatch, favourtieMoviesLoaded, user]);

  return (
    <span className="list_item_icons" onClick={addToFavourites}>
      {movie && favouriteMovies?.some(singleMovie => singleMovie.id === movie.id) ? <i className="bx bx-bookmark nav__icon" style={{color:"red"}}></i> : <i className="bx bx-bookmark nav__icon"></i>}
    </span>
  );
}

export default AddFavourite;
