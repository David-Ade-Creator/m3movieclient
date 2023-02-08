import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "Assets/css/index.css";
import "react-multi-carousel/lib/styles.css";
import MovieContextProvider from 'Context/MovieContext';

ReactDOM.render(
  // <React.StrictMode>
    <MovieContextProvider>
    <App />
    </MovieContextProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
