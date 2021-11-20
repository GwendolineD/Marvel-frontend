import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Character = ({ character, favoritesCh, setFavoritesCh, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoritesCh.indexOf(character._id) !== -1) {
      setIsFavorite(true);
    }
  }, [character, favoritesCh]);

  const favorite = async () => {
    try {
      if (!isFavorite) {
        const newTab = [...favoritesCh];
        newTab.push(character._id);
        const response = await axios.post(
          "https://marvel-backend-gwendoline.herokuapp.com/changeFavorite",
          {
            favoriteCharacters: newTab,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoritesCh(response.data.favoriteCharacters);
        Cookies.set(
          "favoritesCh",
          JSON.stringify(response.data.favoriteCharacters),
          {
            expires: 10,
            secure: true,
          }
        );
      } else {
        const newTab = favoritesCh.filter(
          (favorite) => favorite !== character._id
        );
        const response = await axios.post(
          "https://marvel-backend-gwendoline.herokuapp.com/changeFavorite",
          {
            favoriteCharacters: newTab,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoritesCh(response.data.favoriteCharacters);
        Cookies.set(
          "favoritesCh",
          JSON.stringify(response.data.favoriteCharacters),
          {
            expires: 10,
            secure: true,
          }
        );
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      <Link to={`/comics/${character._id}`}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt="personnage"
        />

        <h2>{character.name}</h2>
        <p>{character.description}</p>
      </Link>
      <input onChange={favorite} type="checkbox" checked={isFavorite} />
    </div>
  );
};

export default Character;
