import axios from "axios";
import { useState, useEffect } from "react";

import Comic from "../components/Comic";
import Downloading from "../components/Downloading";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataComics, setDataComics] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:3000/comics");
        console.log(response.data);
        setDataComics(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading ? (
    <Downloading />
  ) : (
    <div className="container">
      {dataComics.results.map((comic) => {
        return <Comic key={comic._id} comic={comic} />;
      })}
    </div>
  );
};

export default Comics;
