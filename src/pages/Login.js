import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ baseUrl, handleConnectDisconnect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, {
          email: email,
          password: password,
        });

        console.log("data>>>>", data);

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
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Désolé, la connexion a échoué.");
        }
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs.");
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
