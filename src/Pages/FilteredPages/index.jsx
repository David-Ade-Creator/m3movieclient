import axios from "axios";
import { base_url } from "Components/Data";
import PageHeader from "Components/Header";
import MovieList from "Components/LayoutComponents/MovieList";
import { MovieContext } from "Context/MovieContext";
import React from "react";

function FavouritesPage() {
  const { auth, dispatch, movieState } = React.useContext(MovieContext);
  const [loading, setLoading] = React.useState(false);
  axios.defaults.headers.common = { Authorization: `Bearer ${auth.token}` };
  const user = auth.data?._doc;

  const {favouriteMovies,favourtieMoviesLoaded} = movieState;

  React.useEffect(() => {
    const fetchFavouritesMoviesData = async () => {
      if (!user) return;
      if(favourtieMoviesLoaded) return;
      setLoading(true);
      try {
        const response = await axios.get(`${base_url}/api/m3/favourites`);
        dispatch({
            type: "FETCHED_FAVOURITE_MOVIES",
            payload : response.data
          });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };
    fetchFavouritesMoviesData();
  }, [dispatch, favourtieMoviesLoaded, user]);

  return (
    <PageHeader pageLoading={loading}>
      <MovieList movies={favouriteMovies} />
    </PageHeader>
  );
}

export default FavouritesPage;
