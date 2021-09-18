import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
        <Routes />
      </Router>
  );
}

export default App;
