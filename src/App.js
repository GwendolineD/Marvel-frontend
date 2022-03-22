import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorite from "./pages/Favorite";
import ComicsCharacter from "./pages/ComicsCharacter";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faGrinHearts } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faGrinHearts);

function App() {
  // Favorites' Characters
  const favoriteCh = Cookies.get("favoritesCh");
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    favoriteCh ? JSON.parse(Cookies.get("favoritesCh")) : []
  );
  // Favorites' Comics
  const favoriteCo = Cookies.get("favoritesCo");
  const [favoriteComics, setFavoriteComics] = useState(
    favoriteCo ? JSON.parse(Cookies.get("favoritesCo")) : []
  );
  // Username and avatar
  const userInfos = Cookies.get("userInfos");
  const [userConnected, setUserConnected] = useState(
    userInfos ? JSON.parse(Cookies.get("userInfos")) : {}
  );
  // Token
  const [token, setToken] = useState(Cookies.get("token") || null);

  // const baseUrl = "https://marvel-backend-gwendoline.herokuapp.com";
  const baseUrl = "http://localhost:3001";

  const handleConnectDisconnect = (token, userInfos, favCh, favCo) => {
    if (token) {
      // Connection
      Cookies.set("token", token, { expires: 10, secure: true });
      Cookies.set("userInfos", JSON.stringify(userInfos), {
        expires: 10,
        secure: true,
      });
      Cookies.set("favCh", JSON.stringify(favCh));
      Cookies.set("favCo", JSON.stringify(favCo));
    } else {
      // Disconnection
      Cookies.remove("token");
      Cookies.remove("userInfos");
      Cookies.remove("favCh");
      Cookies.remove("favCo");
    }

    setToken(token);
    setUserConnected(userInfos);
    setFavoriteCharacters(favCh);
    setFavoriteComics(favCo);
  };

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        userConnected={userConnected}
        setUserConnected={setUserConnected}
        setFavoritesCh={setFavoriteCharacters}
        setFavoritesCo={setFavoriteComics}
        handleConnectDisconnect={handleConnectDisconnect}
        baseUrl={baseUrl}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              favoritesCh={favoriteCharacters}
              setFavoritesCh={setFavoriteCharacters}
              token={token}
              baseUrl={baseUrl}
            />
          }
        />
        <Route
          path="/comics/:characterId"
          element={
            <ComicsCharacter
              favoritesCh={favoriteCharacters}
              setFavoritesCh={setFavoriteCharacters}
              favoritesCo={favoriteComics}
              setFavoritesCo={setFavoriteComics}
              token={token}
              baseUrl={baseUrl}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              favoritesCo={favoriteComics}
              setFavoritesCo={setFavoriteComics}
              token={token}
              baseUrl={baseUrl}
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
              baseUrl={baseUrl}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              setToken={setToken}
              setUserConnected={setUserConnected}
              baseUrl={baseUrl}
              handleConnectDisconnect={handleConnectDisconnect}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setUserConnected={setUserConnected}
              baseUrl={baseUrl}
              handleConnectDisconnect={handleConnectDisconnect}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
