import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import Downloading from "../components/Downloading";
import Character from "../components/Character";
import Comic from "../components/Comic";

const ComicsCharacter = ({
  favoritesCh,
  setFavoritesCh,
  token,
  favoritesCo,
  setFavoritesCo,
}) => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  console.log(characterId);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://marvel-backend-gwendoline.herokuapp.com/comics/${characterId}`
          // `http://localhost:3000/comics/${characterId}`
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
    <div className="comicsCh">
      <div className="container">
        <div>
          <Character
            character={data}
            favoritesCh={favoritesCh}
            setFavoritesCh={setFavoritesCh}
            token={token}
          />
        </div>

        <h1>
          Comics dans lesquels <span>{data.name}</span> apparait :{" "}
        </h1>
        <div className=" cards">
          {data.comics.map((comic) => {
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

export default ComicsCharacter;
