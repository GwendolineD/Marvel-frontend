import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "./Modal";

import logo from "../assets/img/logoMarvel.png";

const Header = ({
  token,
  setToken,
  userConnected,
  setUserConnected,
  setFavoritesCo,
  setFavoritesCh,
  handleConnectDisconnect,
  baseUrl,
}) => {
  const [displayModal, setDisplayModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // const handleDeconnect = () => {
  //   Cookies.remove("username");
  //   Cookies.remove("token");
  //   Cookies.remove("favoritesCh");
  //   Cookies.remove("favoritesCo");

  //   setFavoritesCh([]);
  //   setFavoritesCo([]);

  //   setToken("");

  //   navigate("/");
  // };

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
            <div className="avatarContainer">
              <img src={userConnected.avatar} alt="avatar" className="avatar" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="exchange"
                onClick={() => {
                  setDisplayModal(true);
                }}
              >
                <path d="M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z" />
              </svg>
            </div>
            {/* <span>
              <FontAwesomeIcon icon="user" />
            </span> */}

            <p>Welcome {userConnected.username} !</p>
          </div>

          <button
            onClick={() => {
              handleConnectDisconnect(null);
              navigate("/");
            }}
          >
            Deconnexion
          </button>
        </div>
      </div>
      {displayModal && (
        <Modal
          setDisplayModal={setDisplayModal}
          actualAvatar={userConnected.avatar}
          baseUrl={baseUrl}
          token={token}
          setUserConnected={setUserConnected}
        />
      )}
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
