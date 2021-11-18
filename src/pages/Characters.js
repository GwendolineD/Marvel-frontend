import axios from "axios";
import { useEffect, useState } from "react";

import Character from "../components/Character";
import Downloading from "../components/Downloading";

const Characters = ({ favorites, setFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacters, setDataCharacters] = useState({});
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(100);
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `http://localhost:3000/characters?name=${searchName}&limit=${limit}&skip=${
            (pageActive - 1) * limit
          }`
        );
        console.log(response.data);
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
      <div className="container">
        <input
          onChange={(event) => {
            setLimit(event.target.value);
          }}
          type="number"
          value={limit}
        />{" "}
        de comics par page
      </div>
      <div className="container">
        page{" "}
        <input
          onChange={(event) => {
            setPageActive(event.target.value);
          }}
          type="number"
          value={pageActive}
        />{" "}
        sur {numberOfPages} pages
      </div>
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
              favorites={favorites}
              setFavorites={setFavorites}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Characters;