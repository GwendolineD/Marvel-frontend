import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Character from "../components/Character";

const Favorite = ({
  favoriteCharacters,
  setFavoriteCharacters,
  favoriteComics,
  setFavoriteComics,
  token,
}) => {
  const [dataCh, setDataCh] = useState([]);
  const [dataCo, setDataCo] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseCh = await axios.get(
          `https://marvel-backend-gwendoline.herokuapp.com/characters`
          // `http://localhost:3000/characters`
        );
        // console.log(responseCh.data.results);
        setDataCh(responseCh.data.results);

        const responseCo = await axios.get(
          "https://marvel-backend-gwendoline.herokuapp.com/comics"
          // "http://localhost:3000/comics"
        );
        // console.log("co", responseCo.data.results);
        setDataCo(responseCo.data.results);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const selectedCharacters = dataCh.filter((item) =>
    favoriteCharacters.includes(item._id)
  );
  const selectedComics = dataCo.filter((item) =>
    favoriteComics.includes(item._id)
  );
  // console.log("selec>>>", selectedComics);

  return token ? (
    <div>
      <h2>Personnages favoris</h2>
      <div className="container">
        {selectedCharacters.length === 0 ? (
          <div>Vous n'avez pas encore de comic favoris</div>
        ) : (
          selectedCharacters.map((character, index) => {
            return (
              <Character
                key={character._id}
                character={character}
                favoritesCh={favoriteCharacters}
                setFavoritesCh={setFavoriteCharacters}
              />
            );
          })
        )}
      </div>

      <h2>Comics favoris</h2>
      <div className="container">
        {selectedComics.length === 0 ? (
          <div>Vous n'avez pas encore de personnage favoris</div>
        ) : (
          selectedComics.map((comic, index) => {
            return (
              <Character
                key={comic._id}
                character={comic}
                favorites={favoriteComics}
                setFavorites={setFavoriteComics}
              />
            );
          })
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromFavorite: true }} />
  );
};

export default Favorite;
