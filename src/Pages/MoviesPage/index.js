import React from "react";
import { Modal, Tag, Space } from 'antd';
import axios from 'axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Request from "../../Components/Request";
import "./style.css";

function MovieHome() {
    const [selectedMovieId,SetSelectedMovieId] = React.useState("");
    const [movieTrailer,setMovieTrailer] = React.useState("");
    const [movieDetailsVisible, setMovieDetailsVisible] = React.useState(false)
  const str = "This is a test for the movie to be watched here and there";

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const viewMovieDetails = (movieId) => {
      console.log(selectedMovieId)
      SetSelectedMovieId(movieId);
      setMovieDetailsVisible(true);
  }

  const closeMovieDetails = ()=>{
      SetSelectedMovieId("");
      setMovieDetailsVisible(false);
  }

  const opts = {
        height: '390',
        width:'100%',
        playerVars:{
            autoplay:1,
        }
    };


    const fetchData = async()=> {
        // setLoading(true)
        const response = await axios.get(Request.fetchDefaultMovies);
        // setMovies(request.data.results);
        // setLoading(false);
        console.log(response);
    }

    React.useEffect(()=>{
        fetchData()
    },[]);

  const MovieDetails = () => {
      return(
        <Modal width={800} bodyStyle={{background:"black",color:"white",padding:"1rem .4rem"}} onCancel={closeMovieDetails}  visible={movieDetailsVisible} footer={null}>
        <div className="container-fluid">
            <div className="row">
        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-1606255499.jpg" alt="movie-backdrop" style={{width:"100%",height:"400px"}}/>
        </div>
        <div className="row pt-2">
       <div className="col-lg-12">
           <h6 style={{color:"white"}}>Tenent</h6>
           <Space><Tag color="blue">6.8</Tag> <Tag>2021-09-03</Tag></Space>
           <p style={{padding:"5px 0",margin:"0"}}>Language : English Deutch</p>
           <p style={{padding:"5px 0",margin:"0"}}>Production Company : English Deutch</p>
           <p className="pt-1">Cinderella, an orphaned girl with an evil stepmother, has big dreams and with the help of her Fabulous Godmother, she perseveres to make them come true.</p>
       </div>
       <div className="col-lg-12">
           <h6 style={{color:"white"}}>Trailer</h6>
       </div>
       <div className="col-lg-12">
       <YouTube videoId="Cinderalla" opts={opts} />
       </div>
        </div>
        </div>
      </Modal>
      )
  }

  return (
    <div className="container-fluid p-0">
        <MovieDetails/>
      <div className="row">
        <div
          className="banner_container"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-1606255499.jpg")`,
            backgroundposition: "center center",
          }}
        >
          <div className="banner_contents">
            <h1 className="banner_title">Movie title</h1>
            <div className="banner_buttons">
              <button className="banner_button">Details</button>
              <button className="banner_button">My List</button>
              <h1 className="banner_description">
                {/* {truncate(movie?.overview,150)} */}
                {truncate(str, 150)}
              </h1>
            </div>
          </div>

          {/* <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1> */}

          <div className="banner_fadeBottom"></div>
        </div>
      </div>
      <div
        className="row"
        style={{ background: "black", padding: "3rem 1.7rem" }}
      >
        <div className="col-lg-3 mb-3 movie_card">
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-1606255499.jpg"
            alt="loaded"
          />
          <div className="movie_card_meta">
            <span style={{ cursor: "pointer" }} onClick={viewMovieDetails}>Name of Movie comes here</span>{" "}
            <span style={{ cursor: "pointer" }}>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieHome;
