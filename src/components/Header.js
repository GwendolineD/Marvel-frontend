import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/img/logoMarvel.png";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken, userConnected }) => {
  const navigate = useNavigate();

  const handleDeconnect = () => {
    Cookies.remove("username");
    Cookies.remove("token");
    Cookies.remove("favoritesCh");
    Cookies.remove("favoritesCo");

    setToken("");
    navigate("/");
  };

  return token ? (
    <div>
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="Logo Marvel" />
        </Link>

        <Link to="/">Personnage</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorite">Favoris</Link>

        <span>Welcome {userConnected}</span>

        <button onClick={handleDeconnect}>Deconnexion</button>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="Logo Marvel" />
        </Link>

        <Link to="/">Personnage</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorite">Favoris</Link>

        <Link to="/signup">Inscription</Link>
        <Link to="/login">Connexion</Link>
      </div>
    </div>
  );
};

export default Header;
