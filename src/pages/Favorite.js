import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Character from "../components/Character";
import Comic from "../components/Comic";

const Favorite = ({
  favoritesCh,
  setFavoriteCharacters,
  favoriteComics,
  setFavoriteComics,
  baseUrl,
}) => {
  const token = Cookies.get("token");

  return token ? (
    <div className="favorisPage">
      <div className="container favoris">
        <div>
          <h2 style={{ marginRight: 20 }}>Personnages favoris</h2>

          <div className="favCh">
            {favoritesCh.length === 0 ? (
              <div className="noFavorite">
                Vous n'avez pas encore de personneges favoris
              </div>
            ) : (
              favoritesCh.map((character) => {
                return (
                  <Character
                    key={character._id}
                    character={character}
                    favoritesCh={favoritesCh}
                    setFavoritesCh={setFavoriteCharacters}
                    token={token}
                    baseUrl={baseUrl}
                  />
                );
              })
            )}
          </div>
        </div>

        <div>
          <h2 style={{ marginLeft: 20 }}>Comics favoris</h2>

          <div className="favCo">
            {favoriteComics.length === 0 ? (
              <div>Vous n'avez pas encore de comics favoris</div>
            ) : (
              favoriteComics.map((comic) => {
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
