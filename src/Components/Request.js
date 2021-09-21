export const API_KEY = "c99d3d6e5ac285a93a293e3c400b1284";

const requests = {
    fetchAllMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
    fetchPopularMovies: `https://api.themoviedb.org/3/trending/a;;/week?api_key=${API_KEY}&language=en-US`,
    fetchLatestMovies : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`,
}

export default requests;