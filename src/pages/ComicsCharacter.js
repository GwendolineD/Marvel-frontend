import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import Downloading from "../components/Downloading";
import Character from "../components/Character";
import Comic from "../components/Comic";

const ComicsCharacter = ({
  favoritesCh,
  setFavoritesCh,
  token,
  favoritesCo,
  setFavoritesCo,
  baseUrl,
}) => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${baseUrl}/comics/${characterId}`);

        // console.log(response.data);

        setData(response.data);
      };
      fetchData();
    } catch (error) {
      console.log("catch comics characters>>>>>>", error.response);
    }
    setIsLoading(false);
  }, [characterId, baseUrl]);

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
