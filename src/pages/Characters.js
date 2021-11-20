import axios from "axios";
import { useEffect, useState } from "react";

import Character from "../components/Character";
import Downloading from "../components/Downloading";
import Pagination from "../components/Pagination";

const Characters = ({ favoritesCh, setFavoritesCh, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacters, setDataCharacters] = useState({});
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(100);
  const [pageActive, setPageActive] = useState(1);

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
    <div>
      <div className="container">{dataCharacters.count} resultats</div>

      <Pagination
        pageActive={pageActive}
        setPageActive={setPageActive}
        numberOfPages={numberOfPages}
        limit={limit}
        setLimit={setLimit}
      />
      <div className="container">
        <input
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
          type="search"
          name=""
          id=""
        />
      </div>

      <div className="container">
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
  );
};

export default Characters;
