import React from "react";
import axios from "axios";
import { Button, Modal, Result, Select } from "antd";
import { useHistory } from "react-router-dom";
import Request from "../../Components/Request";
import "./style.css";
import { image_url, URL } from "../../Components/Constants";
import LoginPage from "../Auth/login";
import RegisterPage from "../Auth/register";
import { MovieContext } from "../../Context/MovieContext";
import MovieList from "../../Components/MovieList";
import MovieHeader from "../../Components/Header";
import DefaultLoader from "../../Components/Loader";

const { Option } = Select;

function MovieHome() {
  const history = useHistory();
  const { auth } = React.useContext(MovieContext);
  axios.defaults.headers.common = { Authorization: `Bearer ${auth.token}` };
  const [movies,setMovies] = React.useState(null);
  const [error,setError] = React.useState(null);
  const [loading,setLoading] = React.useState(false);

  const [bannerMovie, setBannerMovie] = React.useState(null);
  const [movieFilter, setMovieFilter] = React.useState("all");

  const [loginModal, setLoginModal] = React.useState(false);
  const [registerModal, setRegisterModal] = React.useState(false);
  const user = auth.data?._doc;

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Request.fetchAllMovies);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.errors)
    }
  };

  const fetchLatestMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Request.fetchLatestMovies);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.errors)
    }
  };

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Request.fetchPopularMovies);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.errors);
      setLoading(false);
    }
  };

 

  const fetchFavouritesMovies = async () => {
    if (user) {
      history.push(URL.MyList);
    } else {
      setLoginModal(true);
    }
  };

  const filterMovies = async () => {
    switch (movieFilter) {
      case "all":
        fetchAllMovies();
        break;
      case "latest":
        fetchLatestMovies();
        break;
      case "popular":
        fetchPopularMovies();
        break;
      default:
        fetchAllMovies();
    }
  };

  React.useEffect(() => {
    filterMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieFilter]);

  React.useEffect(() => {
    if (movies)
      setBannerMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
  }, [movies]);

  return loading ? <DefaultLoader/> : (
    <div className="container-fluid p-0">
      <MovieHeader />
      <LoginPage
        isVisible={loginModal}
        setVisible={setLoginModal}
        setRegisterVisible={setRegisterModal}
      />
      <RegisterPage
        isVisible={registerModal}
        setVisible={setRegisterModal}
        setLoginVisible={setLoginModal}
      />
      <div className="row">
        <div
          className="banner_container"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${image_url}${bannerMovie?.backdrop_path})`,
            backgroundposition: "center center",
          }}
        >
          <div className="banner_contents">
            <h1 className="banner_title">{bannerMovie?.title}</h1>
            <div className="banner_buttons">
              <button className="banner_button" onClick={fetchFavouritesMovies}>
                My Favourites
              </button>
              <h1 className="banner_description">
                {truncate(bannerMovie?.overview, 150)}
              </h1>
            </div>
          </div>

          <div className="banner_fadeBottom"></div>
        </div>
      </div>
      {error && <Modal
      visible={true}
      closable={false}
      footer={null} 
      >
      <Result
    status="error"
    title="Unable to load movies"
    extra={[
      <Button type="primary" key="console">
        Try Again
      </Button>
    ]}
  >
  </Result>
      </Modal>}
      <div className="row filter-row">
        <div className="col-lg-12">
          <div className="card_container_header">
            <span style={{ fontSize: "1.2rem" }}>{movieFilter.toUpperCase() + " MOVIES"}</span>
            <span>
              <Select
                value={movieFilter}
                style={{ width: 120 }}
                onChange={(v) => setMovieFilter(v)}
              >
                <Option value="all">All</Option>
                <Option value="popular">Popular</Option>
                <Option value="latest">Latest</Option>
              </Select>
            </span>
          </div>
        </div>
      </div>
      <MovieList movies={movies} />
    </div>
  );
}

export default MovieHome;
