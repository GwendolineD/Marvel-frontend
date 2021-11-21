import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/img/logoMarvel.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  token,
  setToken,
  userConnected,
  setFavoritesCo,
  setFavoritesCh,
}) => {
  const navigate = useNavigate();

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
    <div className="header">
      <div className="container">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="Logo Marvel" />
          </Link>
        </div>

        <div className="menu">
          <Link to="/">Personnages</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favorite">Vos favoris</Link>
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
    </div>
  ) : (
    <div className="all  header">
      <div className="container">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="Logo Marvel" />
          </Link>
        </div>

        <div className="menu">
          <Link to="/">Personnages</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favorite">Vos favoris</Link>
        </div>

        <div>
          <Link to="/signup">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
