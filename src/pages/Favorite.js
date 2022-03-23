import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Triangle } from "react-loader-spinner";

import Character from "../components/Character";
import Comic from "../components/Comic";

const Favorite = ({
  favoritesCh,
  setFavoriteCharacters,
  favoriteComics,
  setFavoriteComics,
  // token,
  baseUrl,
}) => {
  const [dataCh, setDataCh] = useState([]);
  const [dataCo, setDataCo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get("token");

  //Get all comics and characters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDataCh(data.favCh);
        setDataCo(data.favCo);
        console.log("ch>>>>", data.favCh);
        console.log("co>>>>", data.favCo);

        // const responseCo = await axios.get(`${baseUrl}/comics`);
        // ;
        // console.log("co>>>>", responseCo.data);
      } catch (error) {
        console.log("catch favorites>>>>>>", error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [baseUrl]);

  //Filters and keep only the favorites
  // const selectedCharacters = dataCh.filter((item) =>
  //   favoritesCh.includes(item._id)
  // );
  // const selectedComics = dataCo.filter((item) =>
  //   favoriteComics.includes(item._id)
  // );

  return token ? (
    <div className="favorisPage">
      <div className="container favoris">
        <div>
          <h2 style={{ marginRight: 20 }}>Personnages favoris</h2>

          <div className="favCh">
            {dataCh.length === 0 ? (
              isLoading ? (
                <Triangle
                  ariaLabel="loading-indicator"
                  height="40"
                  width="40"
                  color="#f0141e"
                />
              ) : (
                <div className="noFavorite">
                  Vous n'avez pas encore de personneges favoris
                </div>
              )
            ) : (
              dataCh.map((character) => {
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
            {dataCo.length === 0 ? (
              isLoading ? (
                <Triangle
                  ariaLabel="loading-indicator"
                  height="40"
                  width="40"
                  color="#f0141e"
                />
              ) : (
                <div>Vous n'avez pas encore de comics favoris</div>
              )
            ) : (
              dataCo.map((comic) => {
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
