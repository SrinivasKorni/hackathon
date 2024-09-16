import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./Login.css"; // Assuming you will create a CSS file for styling

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token); // Store token in local storage
  }, [username, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://13.233.145.139/api/v1/users/authenticate",
        {
          host: username,
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.status === true) {
        setLoggedIn(true);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/main");
        }, 2000);
      } else {
        setError(response.data.data || "Invalid username or token");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        setError("Invalid input. Please check your username and token.");
      } else if (error.response && error.response.status === 404) {
        setError("Endpoint not found. Please check the URL.");
      } else {
        setError("Failed to login. Please try again.");
      }
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="inputGroup">
          <label htmlFor="username">DataBricks Id:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="token">Token:</label>
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <div className="text-center">
            <h4>Login Successful!</h4>
            <p>Redirecting to the main page...</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
