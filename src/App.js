import { BrowserRouter as Router } from "react-router-dom";
import MovieContextProvider from "./Context/MovieContext";
import Routes from "./routes";
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <MovieContextProvider>
      <Router>
        <Routes />
      </Router>
    </MovieContextProvider>
  );
}

export default App;
