import axios from "axios";
import { useState, useEffect } from "react";

import Comic from "../components/Comic";
import Downloading from "../components/Downloading";
import Pagination from "../components/Pagination";
import bandeau from "../assets/img/marvel-comic.jpg";

const Comics = ({ favoritesCo, setFavoritesCo, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataComics, setDataComics] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [limit, setLimit] = useState(100);
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-backend-gwendoline.herokuapp.com/comics?title=${searchTitle}&limit=${limit}&skip=${
            (pageActive - 1) * limit
          }`
          // `http://localhost:3000/comics?title=${searchTitle}&limit=${limit}&skip=${
          //   (pageActive - 1) * limit
          // }`
        );
        // console.log(response.data.favoriteComics);
        setDataComics(response.data);

        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [searchTitle, limit, pageActive]);

  const numberOfPages = Math.ceil(dataComics.count / limit);
  // console.log("numberOfPages>>>", numberOfPages);

  return isLoading ? (
    <Downloading />
  ) : (
    <div className="page">
      <img src={bandeau} alt="Tous les personnages Marvel" />
      <div className="container">
        <div className="topPage">
          <h1>Les comics</h1>

          <input
            onChange={(event) => {
              setSearchTitle(event.target.value);
            }}
            type="search"
            placeholder="Recherchez votre comic préferé"
          />
        </div>

        <Pagination
          pageActive={pageActive}
          setPageActive={setPageActive}
          numberOfPages={numberOfPages}
          limit={limit}
          setLimit={setLimit}
          numberOfResults={dataComics.count}
        />

        <div className="cards">
          {dataComics.results.map((comic) => {
            return (
              <Comic
                key={comic._id}
                comic={comic}
                favoritesCo={favoritesCo}
                setFavoritesCo={setFavoritesCo}
                token={token}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comics;
