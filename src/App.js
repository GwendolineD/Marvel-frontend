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
  const favoriteLocalStorage = JSON.parse(localStorage.getItem("favorites"));
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    favoriteLocalStorage ? favoriteLocalStorage : []
  );
  console.log("test", favoriteCharacters);

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
        <Route path="/comics" element={<Comics />} />
        <Route
          path="/favorite"
          element={
            <Favorite
              favoriteCharacters={favoriteCharacters}
              setFavoriteCharacters={setFavoriteCharacters}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
