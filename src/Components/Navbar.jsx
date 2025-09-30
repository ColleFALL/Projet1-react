import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow-sm fixed-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center text-white  fs-4" href="#">
          <span className="me-2" style={{fontSize:"24px"}}>🌍</span>
          MondeConnecté
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active text-white fs-4" href="#">Accueil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-4" href="#">Informations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-4" href="#">Continents</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
