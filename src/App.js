import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorite from "./pages/Favorite";
import ComicsCharacter from "./pages/ComicsCharacter";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {
  // const favoriteChStorage = JSON.parse(localStorage.getItem("favoritesCh"));
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  console.log("fav ch in app >>>", favoriteCharacters);

  const favoriteCoStorage = JSON.parse(localStorage.getItem("favoritesCo"));
  const [favoriteComics, setFavoriteComics] = useState(
    favoriteCoStorage ? favoriteCoStorage : []
  );
  // const userConnected = JSON.parse(Cookies.get("user"));
  const [userConnected, setUserConnected] = useState(
    Cookies.get("username") || ""
  );
  const [token, setToken] = useState(Cookies.get("token") || "");

  // console.log("user", user);
  // const token = user.token;
  // const username = user.username;

  return (
    <Router>
      <Header token={token} setToken={setToken} userConnected={userConnected} />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              favoritesCh={favoriteCharacters}
              setFavoritesCh={setFavoriteCharacters}
              token={token}
            />
          }
        />
        <Route path="/comics/:characterId" element={<ComicsCharacter />} />
        <Route
          path="/comics"
          element={
            <Comics
              favorites={favoriteComics}
              setFavorites={setFavoriteComics}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <Favorite
              favoriteCharacters={favoriteCharacters}
              setFavoriteCharacters={setFavoriteCharacters}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
              token={token}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup setToken={setToken} setUserConnected={setUserConnected} />
          }
        />
        <Route
          path="/login"
          element={
            <Login setToken={setToken} setUserConnected={setUserConnected} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
