import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = ({
  setToken,
  setUserConnected,
  baseUrl,
  handleConnectDisconnect,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`${baseUrl}/signup`, {
        username: username,
        email: email,
        password: password,
      });

      console.log("data>>>", data);

      handleConnectDisconnect(
        data.token,
        {
          username: data.username,
          avatar: data.avatar,
        },
        data.favoriteCharacters,
        data.favoriteComics
      );

      // // Store the token
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

      navigate("/");
    } catch (error) {
      console.log("catch signUp>>>>>>", error.response);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="formPage">
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <h2>Nom</h2>

        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          value={username}
        />

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
          required
          value={password}
        />

        <span className="errorMessage">{errorMessage}</span>

        <input type="submit" value="Je m'inscris" />
      </form>

      <Link to="/login">Tu as déjà un compte ? Connecte toi !</Link>
    </div>
  );
};

export default Signup;
