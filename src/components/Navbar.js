import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function Navb() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          style={{ color: "white" }}
          className="custom-navbar-brand"
        >
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Automate-Databricks
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
