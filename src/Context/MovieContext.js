import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const MovieContext = createContext({});


const MovieContextProvider = ({ children }) => {
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
      <MovieContext.Provider value={{ auth, setAuthToken }}>
        {children}
      </MovieContext.Provider>
    );
  };
  
  export default MovieContextProvider;