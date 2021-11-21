import axios from "axios";
import { useEffect, useState } from "react";

import Character from "../components/Character";
import Downloading from "../components/Downloading";
import Pagination from "../components/Pagination";
import bandeau from "../assets/img/marvel-perso.jpg";

const Characters = ({ favoritesCh, setFavoritesCh, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacters, setDataCharacters] = useState({});
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(100);
  const [pageActive, setPageActive] = useState(1);

  //récupérer tous les personnages
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-backend-gwendoline.herokuapp.com/characters?name=${searchName}&limit=${limit}&skip=${
            (pageActive - 1) * limit
          }`
          // `http://localhost:3000/characters?name=${searchName}&limit=${limit}&skip=${
          //   (pageActive - 1) * limit
          // }`
        );
        setDataCharacters(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [searchName, limit, pageActive]);

  const numberOfPages = Math.ceil(dataCharacters.count / limit);

  return isLoading ? (
    <Downloading />
  ) : (
    <div className="page">
      <img src={bandeau} alt="Tous les personnages Marvel" />

      <div className="container">
        <div className="topPage">
          <h1>Les personnages</h1>

          <input
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
            type="search"
            placeholder="Recherchez votre personnage préferé"
          />
        </div>

        <Pagination
          pageActive={pageActive}
          setPageActive={setPageActive}
          numberOfPages={numberOfPages}
          limit={limit}
          setLimit={setLimit}
          numberOfResults={dataCharacters.count}
        />

        <div className="cards">
          {dataCharacters.results.map((character) => {
            return (
              <Character
                key={character._id}
                character={character}
                favoritesCh={favoritesCh}
                setFavoritesCh={setFavoritesCh}
                token={token}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
