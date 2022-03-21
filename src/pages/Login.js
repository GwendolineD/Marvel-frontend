import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({
  setToken,
  setUserConnected,
  baseUrl,
  handleConnectDisconnect,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`${baseUrl}/login`, {
        email: email,
        password: password,
      });

      console.log("data>>>>", data);

      // // Store token
      // Cookies.set("token", response.data.token, { expires: 10, secure: true });
      // setToken(response.data.token);

      // // Store user infos
      // Cookies.set("username", response.data.username, {
      //   expires: 10,
      //   secure: true,
      // });
      // setUserConnected(response.data.username);

      // // Store favorites
      // Cookies.set(
      //   "favoritesCh",
      //   JSON.stringify(response.data.favoriteCharacters),
      //   {
      //     expires: 10,
      //     secure: true,
      //   }
      // );
      // Cookies.set("favoritesCo", JSON.stringify(response.data.favoriteComics), {
      //   expires: 10,
      //   secure: true,
      // });

      handleConnectDisconnect(
        data.token,
        {
          username: data.username,
          avatar: data.avatar,
        },
        data.favoriteCharacters,
        data.favoriteComics
      );

      navigate(!location.state?.fromFavorite ? "/" : "/favorite");
    } catch (error) {
      console.log("catch logIn>>>>>>", error.response);
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

      <Link to="/signup">Tu n'as pas encore de compte ? Inscrit toi !</Link>
    </div>
  );
};

export default Login;
