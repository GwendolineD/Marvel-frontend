import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ baseUrl, handleConnectDisconnect }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && email && password) {
      try {
        const { data } = await axios.post(`${baseUrl}/signup`, {
          username: username,
          email: email,
          password: password,
        });

        // console.log("data>>>", data);

        handleConnectDisconnect(
          data.token,
          {
            username: data.username,
            avatar: data.avatar,
          },
          data.favoriteCharacters,
          data.favoriteComics
        );

        navigate("/");
      } catch (error) {
        console.log("catch signUp>>>>>>", error.response);
        if (error.response.status === 406 || error.response.status === 409) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Désolé, l'inscription a échoué.");
        }
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs.");
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
            setErrorMessage("");
          }}
          type="text"
          value={username}
        />

        <h2>Email</h2>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          type="email"
          value={email}
        />

        <h2>Mot de passe</h2>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
            setErrorMessage("");
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
