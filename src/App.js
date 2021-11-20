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

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faUser);

function App() {
  const favoriteCh = Cookies.get("favoritesCh");
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    favoriteCh ? JSON.parse(Cookies.get("favoritesCh")) : []
  );

  const favoriteCo = Cookies.get("favoritesCo");
  const [favoriteComics, setFavoriteComics] = useState(
    favoriteCo ? JSON.parse(Cookies.get("favoritesCo")) : []
  );

  const [userConnected, setUserConnected] = useState(
    Cookies.get("username") || ""
  );
  const [token, setToken] = useState(Cookies.get("token") || "");

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
              favoritesCo={favoriteComics}
              setFavoritesCo={setFavoriteComics}
              token={token}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <Favorite
              favoritesCh={favoriteCharacters}
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
