import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Character from "../components/Character";
import Comic from "../components/Comic";

const Favorite = ({
  favoritesCh,
  setFavoriteCharacters,
  favoriteComics,
  setFavoriteComics,
  token,
  baseUrl,
}) => {
  const [dataCh, setDataCh] = useState([]);
  const [dataCo, setDataCo] = useState([]);

  //Get all comics and characters
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseCh = await axios.get(`${baseUrl}/characters`);
        setDataCh(responseCh.data.results);

        const responseCo = await axios.get(`${baseUrl}/comics`);
        setDataCo(responseCo.data.results);
      };
      fetchData();
    } catch (error) {
      console.log("catch favorites>>>>>>", error.response);
    }
  }, [baseUrl]);

  //Filters and keep only the favorites
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
                Vous n'avez pas encore de personneges favoris
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
              <div>Vous n'avez pas encore de comics favoris</div>
            ) : (
              selectedComics.map((comic) => {
                return (
                  <Comic
                    key={comic._id}
                    comic={comic}
                    favoritesCo={favoriteComics}
                    setFavoritesCo={setFavoriteComics}
                    token={token}
                    baseUrl={baseUrl}
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
