import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({ character, favoritesCh, setFavoritesCh, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  //garder le logo favoris en mémoire
  useEffect(() => {
    if (favoritesCh.indexOf(character._id) !== -1) {
      setIsFavorite(true);
    }
  }, [character, favoritesCh]);

  // ajouter ou retirer un favoris de la base de données
  const favorite = async () => {
    if (token) {
      try {
        //ajouter
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
          //retirer
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
