import { Card } from "antd";
import { image_url } from "Components/Data";
import MovieDetails from "Pages/HomePage/details";
import React from "react";
import AddFavourite from "../AddFavourite";

function MovieList({ movies }) {
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
  return (
    <div className="container movielist_container">
      {movieDetailsVisible && (
        <MovieDetails
          selectedMovie={selectedMovie}
          isVisible={movieDetailsVisible}
          closeModal={closeMovieDetails}
        />
      )}
      {movies?.map((movie, index) => (
        <div className="movielist_content" key={index}>
          <Card bodyStyle={{ padding: "0" }} hoverable>
            <img
              className="list_image"
              src={`${image_url}${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => viewMovieDetails(movie)}
            />
            <div className="list_content">
              <div
                className="list_item_title"
                onClick={() => viewMovieDetails(movie)}
              >
                <i className="bx bx-info-circle nav__icon"></i>
                <h4>{movie.title}</h4>
              </div>
              <span className="list_item_icons mobile_view">
                <i className="bx bx-info-circle nav__icon"></i>
              </span>
              <AddFavourite movie={movie} />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
