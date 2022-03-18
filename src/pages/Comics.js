import { useState, useEffect } from "react";
import axios from "axios";

import Comic from "../components/Comic";
import Downloading from "../components/Downloading";
import Pagination from "../components/Pagination";
import bandeau from "../assets/img/marvel-comic.jpg";

const Comics = ({ favoritesCo, setFavoritesCo, token, baseUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataComics, setDataComics] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [limit, setLimit] = useState(100);
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${baseUrl}/comics?title=${searchTitle}&limit=${limit}&skip=${
            (pageActive - 1) * limit
          }`
        );

        // console.log(response.data.favoriteComics);

        setDataComics(response.data);
      };
      fetchData();
    } catch (error) {
      console.log("catch comics>>>>>>", error.response);
    }
    setIsLoading(false);
  }, [searchTitle, limit, pageActive, baseUrl]);

  const numberOfPages = Math.ceil(dataComics.count / limit);

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
