import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const MovieContext = createContext({});

const initialState = {
  movies: null,
  favouriteMovies: null,
  initializedFavouritemovies: false,
  loadingFavouritemovies: false,
  initializedMovies: false,
  loadingMovies: false,
  Autherror: null,
  MoviesError: null,
  FavouriteMoviesError: null,
};

const reducer = (state, action) => {

  switch (action.type) {
    case "START_FETCHING_MOVIES":
      return {
        loadingFavouritemovies: true,
      };
    case "MOVIES_ERROR":
      return {
        loadingFavouritemovies: false,
        MoviesError: action.payload,
      };
    case "FETCH_MOVIES":
      return {
        movies: action.payload,
        loadingFavouritemovies: false,
        initializedMovies: true,
        MoviesError: null,
      };
    case "FETCH_POPULAR_MOVIES":
      return {
        movies: action.payload,
        loading: false,
        initializedMovies: true,
        MoviesError: null,
      };
    case "FETCH_LATEST_MOVIES":
      return {
        movies: action.payload,
        loading: false,
        initializedMovies: true,
        MoviesError: null,
      };
    case "START_FETCH_FAVOURITES":
      return {
        loadingFavouritemovies: true,
        initializedMovies: true,
      };
    case "FETCH_FAVOURITE_MOVIES":
      return {
        loadingFavouritemovies: false,
        initializedFavouritemovies: true,
        favouriteMovies: action.payload,
        FavouriteMoviesError: null,
        initializedMovies: true,
      };
    case "ADD_FAVOURITE_MOVIES":
      return {
        loadingFavouritemovies: false,
        initializedFavouritemovies: true,
        favouriteMovies: [...state?.favouriteMovies],
        FavouriteMoviesError: null,
        initializedMovies: true,
      };
    case "FAVOURITE_MOVIES_ERROR":
      return {
        loadingFavouritemovies: false,
        initializedFavouritemovies: true,
        FavouriteMoviesError: action.payload,
      };
    default:
      throw new Error();
  }
};

const MovieContextProvider = ({ children }) => {
  const [movieState, dispatch] = React.useReducer(reducer, initialState);
  const [auth, setAuth] = useState({
    token: null,
    data: null,
  });

  // function to update auth data
  const setAuthToken = (token) => {
    const data = parseToken(token);
    setAuth({ data, token });
    if (data) {
      window.localStorage.setItem("authToken", token);
    } else {
      window.localStorage.removeItem("authToken");
    }
    //console.log(auth);
  };

  // parse the jwt token
  const parseToken = (token) => {
    if (token) {
      const decodedData = jwt_decode(token);
      // Check for expired token
      const currentTime = Math.round(Date.now() / 1000);
      if (decodedData.exp > currentTime) return decodedData;
    }
    return null;
  };

  //load the token once from localstorage upon refresh
  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    const data = parseToken(token);
    setAuth({
      token: data ? token : null,
      data,
    });
  }, []);

  return (
    <MovieContext.Provider value={{ auth, setAuthToken, movieState, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
