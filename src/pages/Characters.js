import axios from "axios";
import { useEffect, useState } from "react";

import Character from "../components/Character";
import Downloading from "../components/Downloading";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacters, setDataCharacters] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:3000/characters");
        console.log(response.data);
        setDataCharacters(response.data);
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
    <div>
      <div className="container">{dataCharacters.count} resultats</div>

      <div className="container">
        {dataCharacters.results.map((character) => {
          return <Character key={character._id} character={character} />;
        })}
      </div>
    </div>
  );
};

export default Characters;
