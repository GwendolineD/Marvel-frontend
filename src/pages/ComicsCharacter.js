import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import Downloading from "../components/Downloading";
import Character from "../components/Character";
import Comic from "../components/Comic";

const ComicsCharacter = () => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `http://localhost:3000/comics/${characterId}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [characterId]);

  return isLoading ? (
    <Downloading />
  ) : (
    <div>
      <div className="container">
        <Character character={data} />
      </div>
      <div className="container">
        {data.comics.map((comic) => {
          return <Comic key={comic._id} comic={comic} />;
        })}
      </div>
    </div>
  );
};

export default ComicsCharacter;
