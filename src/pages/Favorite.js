import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Character from "../components/Character";
import Comic from "../components/Comic";

const Favorite = ({
  favoritesCh,
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
        setDataCh(responseCh.data.results);

        const responseCo = await axios.get(
          "https://marvel-backend-gwendoline.herokuapp.com/comics"
          // "http://localhost:3000/comics"
        );
        setDataCo(responseCo.data.results);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const selectedCharacters = dataCh.filter((item) =>
    favoritesCh.includes(item._id)
  );
  const selectedComics = dataCo.filter((item) =>
    favoriteComics.includes(item._id)
  );

  return token ? (
    <div className="favorisPage">
      <div className="container favoris">
        <div>
          <h2>Personnages favoris</h2>
          <div className="favCh">
            {selectedCharacters.length === 0 ? (
              <div className="noFavorite">
                Vous n'avez pas encore de comic favoris
              </div>
            ) : (
              selectedCharacters.map((character) => {
                return (
                  <Character
                    key={character._id}
                    character={character}
                    favoritesCh={favoritesCh}
                    setFavoritesCh={setFavoriteCharacters}
                    token={token}
                  />
                );
              })
            )}
          </div>
        </div>

        <div>
          <h2>Comics favoris</h2>
          <div className="favCo">
            {selectedComics.length === 0 ? (
              <div>Vous n'avez pas encore de personnage favoris</div>
            ) : (
              selectedComics.map((comic) => {
                return (
                  <Comic
                    key={comic._id}
                    comic={comic}
                    favoritesCo={favoriteComics}
                    setFavoritesCo={setFavoriteComics}
                    token={token}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromFavorite: true }} />
  );
};

export default Favorite;
