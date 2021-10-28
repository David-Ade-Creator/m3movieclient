import { Space } from "antd";
import axios from "axios";
import { image_url } from "Components/Data";
import requests from "Components/Data/requests";
import PageHeader from "Components/Header";
import Rowcontainer from "Components/LayoutComponents/Rowcontainer";
import { MovieContext } from "Context/MovieContext";
import React from "react";
import MovieDetails from "./details";

function HomePage() {
  const { auth } = React.useContext(MovieContext);
  axios.defaults.headers.common = { Authorization: `Bearer ${auth.token}` };
  const [loading, setLoading] = React.useState(false);
  const [bannerMovie, setBannerMovie] = React.useState(undefined);
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

  React.useEffect(() => {
    const fetchFavouritesMoviesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(requests.allMovies);
        setBannerMovie(
          response?.data?.results[
            Math.floor(Math.random() * response?.data?.results.length)
          ]
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };
    fetchFavouritesMoviesData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <PageHeader pageLoading={loading}>
      {movieDetailsVisible && <MovieDetails
          selectedMovie={selectedMovie}
          isVisible={movieDetailsVisible}
          closeModal={closeMovieDetails}
        />}
      <div className="homepage_container container">
        <div className="homepage_banner">
          <div className="homepage_img">
            <img src={image_url + bannerMovie?.backdrop_path} alt="" />
          </div>
          <div className="homepage_description">
            <h2 className="homepage_title">{bannerMovie?.title}</h2>
            <p>{truncate(bannerMovie?.overview, 150)}</p>
            <div className="homepage_btn_container">
              <Space>
                <span className="button_primary" onClick={()=>viewMovieDetails(bannerMovie)}>Details</span>
                <span className="button_default">
                  <i class="bx bx-plus"></i>
                </span>
              </Space>
            </div>
          </div>
        </div>
      </div>
      {/* <Rowcontainer
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      /> */}
      <Rowcontainer title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Rowcontainer title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Rowcontainer
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Rowcontainer
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Rowcontainer
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Rowcontainer
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Rowcontainer
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </PageHeader>
  );
}

export default HomePage;
