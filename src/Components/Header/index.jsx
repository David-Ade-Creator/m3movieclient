import DetailLoader from "Components/LayoutComponents/Loaders/detailLoader";
import React from "react";
import { Link } from "react-router-dom";

function PageHeader({ children, pageLoading }) {
  const [isNavbarOpen, setNavbarOpen] = React.useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <React.Fragment>
      <header className="header" id="header">
        <div className="header_container container">
          <div className="header__img">
            <img
              src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
              alt=""
            />
          </div>

          <div className="header__toggle">
            <i className="bx bx-menu" id="header-toggle" onClick={toggleNavbar}></i>
          </div>
        </div>
      </header>
      <div className={`l-navbar ${isNavbarOpen ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <Link to="/" className="nav__logo">
              <i className="bx bx-layer nav__logo-icon"></i>
              <span className="nav__logo-name">M3Movies</span>
            </Link>

            <Link to="/favourites" className="nav__link">
              <i className="bx bx-bookmark nav__icon"></i>
              <span className="nav__name">Favourites</span>
            </Link>

            <div className="nav__list">
              <Link to="/" className="nav__link active">
                <span className="nav__name">Home</span>
              </Link>

              
            </div>
          </div>

          <a href="/" className="nav__link" style={{marginTop:"2rem"}}>
            <i className="bx bx-log-out nav__icon"></i>
            <span className="nav__name">Log Out</span>
          </a>
        </nav>
      </div>
      <main className="body-pd">
          {pageLoading ? <DetailLoader/> : children}
        </main>
    </React.Fragment>
  );
}

export default PageHeader;
