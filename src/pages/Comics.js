import axios from "axios";
import { useState, useEffect } from "react";

import Comic from "../components/Comic";
import Downloading from "../components/Downloading";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataComics, setDataComics] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [limit, setLimit] = useState(100);
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${searchTitle}&limit=${limit}&skip=${
            (pageActive - 1) * limit
          }`
        );
        console.log(response.data);
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
    <div>
      <div className="container">{dataComics.count} resultats</div>
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
            setSearchTitle(event.target.value);
          }}
          type="search"
          name=""
          id=""
        />
      </div>
      <div className="container">
        {dataComics.results.map((comic) => {
          return <Comic key={comic._id} comic={comic} />;
        })}
      </div>
    </div>
  );
};

export default Comics;
