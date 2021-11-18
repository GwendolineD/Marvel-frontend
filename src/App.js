import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorite from "./pages/Favorite";
import ComicsCharacter from "./pages/ComicsCharacter";

function App() {
  const favoriteChStorage = JSON.parse(localStorage.getItem("favoritesCh"));
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    favoriteChStorage ? favoriteChStorage : []
  );
  const favoriteCoStorage = JSON.parse(localStorage.getItem("favoritesCo"));
  const [favoriteComics, setFavoriteComics] = useState(
    favoriteCoStorage ? favoriteCoStorage : []
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={
            <Characters
              favorites={favoriteCharacters}
              setFavorites={setFavoriteCharacters}
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
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
