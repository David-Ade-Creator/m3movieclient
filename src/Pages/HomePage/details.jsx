import { Col, Modal, Row, Space, Tag } from "antd";
import { image_url, API_KEY } from "Components/Data";
import React from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "axios";
import DetailLoader from "Components/LayoutComponents/Loaders/detailLoader";
import AddFavourite from "Components/LayoutComponents/AddFavourite";

function MovieDetails({ selectedMovie, closeModal, isVisible }) {
  const [movie, setMovie] = React.useState(null);
  const [movieLoading, setMovieLoading] = React.useState(false);
  const [trailerUrl, setTrailerUrl] = React.useState("");

  React.useEffect(() => {
    const fetchSingleMovie = async () => {
      setMovieLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie?.id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(response.data);
      movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
      setMovieLoading(false);
    };
    fetchSingleMovie();
  }, [movie?.name, movie?.original_name, movie?.title, selectedMovie]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 2,
    },
  };

  return (
    <Modal width={800} footer={null} onCancel={closeModal} visible={isVisible}>
      {!movie && movieLoading ? (
        <DetailLoader />
      ) : (
        <div>
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <img
                src={`${image_url}${movie?.backdrop_path}`}
                alt="movie-backdrop"
                className="details_img"
              />
            </Col>
            <Col>
            <div style={{display:"flex"}}>
            <h2 className="details_title">{movie?.original_title} </h2>
            <div style={{padding:".9rem"}}><AddFavourite movie={movie} /></div>
            </div>
              
              <Space>
                <Tag color="blue">{movie?.vote_average}</Tag>{" "}
                <Tag>{movie?.release_date}</Tag>
              </Space>
              <p className="details_desc">
                Language :{" "}
                {movie?.spoken_languages.map((language,i) => (
                  <span key={i} style={{ marginRight: ".5rem" }}>{language.name}</span>
                ))}
              </p>
              <p className="details_desc">
                Production Company :{" "}
                {movie?.production_companies.map((company,i) => (
                  <span key={i} style={{ marginRight: ".5rem" }}>{company.name}</span>
                ))}
              </p>
              <p>{movie?.overview}</p>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h2>Trailer</h2>
            </Col>

            <Col lg={24} md={24} sm={24} xs={24}>
              <YouTube videoId={trailerUrl} opts={opts} />
            </Col>
          </Row>
        </div>
      )}
    </Modal>
  );
}

export default MovieDetails;
