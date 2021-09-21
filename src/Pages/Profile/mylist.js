import React from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { URL } from '../../Components/Constants';
import MovieHeader from '../../Components/Header';
import MovieList from '../../Components/MovieList';
import { MovieContext } from '../../Context/MovieContext';

function MyList() {
    const history = useHistory();
    const { auth , dispatch } = React.useContext(MovieContext);
    const [favouriteMovies,setFavouriteMovies] = React.useState(null);
    axios.defaults.headers.common = { Authorization: `Bearer ${auth.token}` };
    const user = auth.data?._doc;

    React.useEffect(()=>{
        if(!auth)
        history.push(URL.HomePage);
    },[auth, history]);

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
        <div className="container-fluid p-0" style={{background:"#2d2e2e",minHeight:"100vh"}}>
        <MovieHeader/>
        <MovieList movies={favouriteMovies} myList />
        </div>
    )
}

export default MyList;
