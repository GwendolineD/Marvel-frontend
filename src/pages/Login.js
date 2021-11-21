import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken, setUserConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://marvel-backend-gwendoline.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );

      Cookies.set("token", response.data.token, { expires: 10, secure: true });
      Cookies.set("username", response.data.username, {
        expires: 10,
        secure: true,
      });
      Cookies.set(
        "favoritesCh",
        JSON.stringify(response.data.favoriteCharacters),
        {
          expires: 10,
          secure: true,
        }
      );
      Cookies.set("favoritesCo", JSON.stringify(response.data.favoriteComics), {
        expires: 10,
        secure: true,
      });

      setToken(response.data.token);
      setUserConnected(response.data.username);

      navigate(!location.state?.fromFavorite ? "/" : "/favorite");
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="formPage">
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        <h2>Email</h2>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          value={email}
        />

        <h2>Mot de passe</h2>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          value={password}
        />

        <span className="errorMessage">{errorMessage} </span>

        <input type="submit" value="Je me connecte" />
      </form>
      <Link to="/login">Tu n'as pas encore de compte ? Inscrit toi !</Link>
    </div>
  );
};

export default Login;
