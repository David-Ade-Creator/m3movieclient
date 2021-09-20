import React from "react";
import { Modal, Tag, Space } from "antd";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Request from "../../Components/Request";
import "./style.css";
import { base_url } from "../../Components/Constants";

const MovieDetails = ({ selectedMovie, closeModal, isVisible }) => {
  const [movie, setMovie] = React.useState(null);
  const [movieLoading, setMovieLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchSingleMovie = async () => {
      setMovieLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=c99d3d6e5ac285a93a293e3c400b1284&language=en-US`
      );
      setMovie(response.data);
      setMovieLoading(false);
      console.log(response);
    };
    fetchSingleMovie();
  }, [selectedMovie]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Modal
      width={800}
      bodyStyle={{
        background: "#2d2e2e",
        color: "white",
        padding: "1rem .4rem",
      }}
      onCancel={closeModal}
      visible={isVisible}
      footer={null}
    >
      {!movie && movieLoading ? (
        <>loading ...</>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <img
              src={`${base_url}${movie?.backdrop_path}`}
              alt="movie-backdrop"
              style={{ width: "100%", height: "400px" }}
            />
          </div>
          <div className="row pt-2">
            <div className="col-lg-12">
              <h6 style={{ color: "white" }}>{movie?.original_title}</h6>
              <Space>
                <Tag color="blue">{movie?.vote_average}</Tag>{" "}
                <Tag>{movie?.release_date}</Tag>
              </Space>
              <p style={{ padding: "5px 0", margin: "0" }}>
                Language :{" "}
                {movie?.spoken_languages.map((language) => (
                  <span style={{ marginRight: ".5rem" }}>{language.name}</span>
                ))}
              </p>
              <p style={{ padding: "5px 0", margin: "0" }}>
                Production Company :{" "}
                {movie?.production_companies.map((company) => (
                  <span style={{ marginRight: ".5rem" }}>{company.name}</span>
                ))}
              </p>
              <p className="pt-1">{movie?.overview}</p>
            </div>
            <div className="col-lg-12">
              <h6 style={{ color: "white" }}>Trailer</h6>
            </div>
            <div className="col-lg-12">
              <YouTube videoId="Cinderalla" opts={opts} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MovieDetails;
