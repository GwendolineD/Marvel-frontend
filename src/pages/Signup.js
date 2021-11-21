import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setToken, setUserConnected }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://marvel-backend-gwendoline.herokuapp.com/signup",
        {
          username: username,
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
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="all formPage">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <h2>Nom</h2>

        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          value={username}
          placeholder="Aaron"
        />

        <h2>Email</h2>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          value={email}
          placeholder="Aaron@mail.com"
        />

        <h2>Mot de passe</h2>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          value={password}
          placeholder="************"
        />
        <input type="submit" value="Je m'inscris" />
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte toi !</Link>
    </div>
  );
};

export default Signup;
