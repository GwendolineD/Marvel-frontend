import { Link } from "react-router-dom";
import logo from "../assets/img/logoMarvel.png";

const Header = () => {
  return (
    <div>
      <div>
        <img className="logo" src={logo} alt="Logo Marvel" />
        <Link to="/characters">Personnage</Link>
        <Link to="comics">Comics</Link>
        <Link to="favorite">Favoris</Link>
      </div>
    </div>
  );
};

export default Header;
