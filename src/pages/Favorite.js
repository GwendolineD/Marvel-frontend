import axios from "axios";
import { useEffect, useState } from "react";

import Character from "../components/Character";

const Favorite = ({ favoriteCharacters, setFavoriteCharacters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/characters`);
        console.log(response.data.results);
        setData(response.data.results);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const selectedCharacters = data.filter((item) =>
    favoriteCharacters.includes(item._id)
  );
  console.log("selec>>>", selectedCharacters);

  return (
    <div>
      <h2>Personnages favoris</h2>
      <div className="container">
        {selectedCharacters.length === 0 ? (
          <div>Vous n'avez pas encore de personnage favoris</div>
        ) : (
          selectedCharacters.map((character, index) => {
            return (
              <Character
                key={character._id}
                character={character}
                favorites={favoriteCharacters}
                setFavorites={setFavoriteCharacters}
              />
            );
          })
        )}
      </div>
      <h2>Comics favoris</h2>
      <div className="container"></div>
    </div>
  );
};

export default Favorite;
