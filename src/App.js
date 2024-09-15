import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navb from "./components/Navbar";
import Divide from "./components/Pane";
import Login from "./components/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navb />
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="/main"
            element={loggedIn ? <Divide /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
