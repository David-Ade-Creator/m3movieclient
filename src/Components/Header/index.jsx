import { Avatar, Button, Popover } from "antd";
import DetailLoader from "Components/LayoutComponents/Loaders/detailLoader";
import { MovieContext } from "Context/MovieContext";
import React from "react";
import { Link } from "react-router-dom";

function PageHeader({ children, pageLoading }) {
  const { logout } = React.useContext(MovieContext);
  const [isNavbarOpen, setNavbarOpen] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const content = (
    <div>
      <Button type="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      <header
        className={`header ${scrollPosition >= "80" ? "scroll-header" : ""}`}
        id="header"
      >
        <div className="header_container container">
          <Popover placement="bottom" content={content} trigger="hover">
            <Avatar
              size={44}
              src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
            />
          </Popover>

          <div className="header__toggle">
            {isNavbarOpen ? (
              <i
                className="bx bx-x"
                id="header-toggle"
                onClick={toggleNavbar}
              ></i>
            ) : (
              <i
                className="bx bx-menu"
                id="header-toggle"
                onClick={toggleNavbar}
              ></i>
            )}
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

          <span
            className="nav__link"
            style={{ marginTop: "2rem", cursor: "pointer" }}
          >
            <i className="bx bx-log-out nav__icon"></i>
            <span className="nav__name" onClick={logout}>
              Log Out
            </span>
          </span>
        </nav>
      </div>
      <main className="body-pd">
        {pageLoading ? <DetailLoader /> : children}
      </main>
    </React.Fragment>
  );
}

export default PageHeader;
