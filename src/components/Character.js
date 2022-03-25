import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({
  character,
  favoritesCh,
  setFavoritesCh,
  token,
  baseUrl,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  //keep favorite in memory
  useEffect(() => {
    if (favoritesCh.findIndex((fav) => fav._id === character._id) !== -1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [character._id, favoritesCh]);

  // Add or remove favorites from the database
  const favorite = async () => {
    if (token) {
      try {
        //add a favorite character
        if (!isFavorite) {
          const newTab = [...favoritesCh];
          newTab.push(character);

          const { data } = await axios.post(
            `${baseUrl}/changeFavorite`,
            {
              favoriteCharacters: newTab,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setFavoritesCh(data.favoriteCharacters);

          Cookies.set("favoritesCh", JSON.stringify(data.favoriteCharacters), {
            expires: 10,
            secure: true,
          });
        } else {
          //remove a favorite character
          const newTab = favoritesCh.filter(
            (favorite) => favorite._id !== character._id
          );
          const { data } = await axios.post(
            `${baseUrl}/changeFavorite`,
            {
              favoriteCharacters: newTab,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoritesCh(data.favoriteCharacters);

          Cookies.set("favoritesCh", JSON.stringify(data.favoriteCharacters), {
            expires: 10,
            secure: true,
          });
        }
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.log("catch character component>>>>", error.response);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card cardCh">
      <Link to={`/comics/${character._id}`} className="firstElement">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />

        <div>
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </div>
      </Link>

      {isFavorite ? (
        <button className="isFavorite checkFavorite" onClick={favorite}>
          <span>
            <FontAwesomeIcon icon="grin-hearts" />
          </span>
        </button>
      ) : (
        <button className="notFavorite checkFavorite" onClick={favorite}>
          <FontAwesomeIcon icon="grin-hearts" />
        </button>
      )}
    </div>
  );
};

export default Character;
