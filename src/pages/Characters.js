import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Character from "../components/Character";
import Downloading from "../components/Downloading";
import Pagination from "../components/Pagination";
import bandeau from "../assets/img/marvel-perso.jpg";

const Characters = ({ favoritesCh, setFavoritesCh, token, baseUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacters, setDataCharacters] = useState({});
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(20);
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/characters?name=${searchName}&limit=${limit}&skip=${
            (pageActive - 1) * limit
          }`
        );
        // console.log(response.data);
        setDataCharacters(response.data);
      } catch (error) {
        console.log("catch characters>>>>>>", error.response);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [searchName, limit, pageActive, baseUrl]);

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
              setPageActive(1);
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
                baseUrl={baseUrl}
              />
            );
          })}
        </div>

        <ReactPaginate
          breakLabel="..."
          onPageChange={(event) => {
            setPageActive(event.selected + 1);
          }}
          pageRangeDisplayed={6}
          pageCount={numberOfPages}
          forcePage={pageActive - 1}
          nextLabel=" >"
          previousLabel="< "
          nextClassName={pageActive === numberOfPages ? "hidden" : undefined}
          previousClassName={pageActive === 1 ? "hidden" : undefined}
          activeClassName="bold"
          containerClassName="paginationContainer"
        />
      </div>
    </div>
  );
};

export default Characters;
