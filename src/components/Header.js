import { useNavigate, useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/img/logoMarvel.png";

const Header = ({
  token,
  setToken,
  userConnected,
  setFavoritesCo,
  setFavoritesCh,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeconnect = () => {
    Cookies.remove("username");
    Cookies.remove("token");
    Cookies.remove("favoritesCh");
    Cookies.remove("favoritesCo");

    setFavoritesCh([]);
    setFavoritesCo([]);

    setToken("");

    navigate("/");
  };

  return token ? (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="Logo Marvel" />
          </Link>
        </div>

        <div className="menu">
          <Link to="/" className={location.pathname === "/" ? "white" : "grey"}>
            Personnages
          </Link>
          <Link
            to="/comics"
            className={location.pathname === "/comics" ? "white" : "grey"}
          >
            Comics
          </Link>
          <Link
            to="/favorite"
            className={location.pathname === "/favorite" ? "white" : "grey"}
          >
            Vos favoris
          </Link>
        </div>

        <div>
          <div>
            <span>
              <FontAwesomeIcon icon="user" />
            </span>

            <p>Welcome {userConnected} !</p>
          </div>

          <button onClick={handleDeconnect}>Deconnexion</button>
        </div>
      </div>
    </header>
  ) : (
    <header className="all">
      <div className="container">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="Logo Marvel" />
          </Link>
        </div>

        <div className="menu">
          <Link to="/" className={location.pathname === "/" ? "white" : "grey"}>
            Personnages
          </Link>
          <Link
            to="/comics"
            className={location.pathname === "/comics" ? "white" : "grey"}
          >
            Comics
          </Link>
          <Link
            to="/favorite"
            className={location.pathname === "/favorite" ? "white" : "grey"}
          >
            Vos favoris
          </Link>
        </div>

        <div>
          <Link to="/signup">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
