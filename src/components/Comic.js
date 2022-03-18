import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = ({ comic, favoritesCo, setFavoritesCo, token, baseUrl }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  //keep favorite in memory
  useEffect(() => {
    if (favoritesCo.indexOf(comic._id) !== -1) {
      setIsFavorite(true);
    }
  }, [comic, favoritesCo]);

  // Add or remove favorites from the database
  const favorite = async () => {
    if (token) {
      try {
        if (!isFavorite) {
          //add
          const newTab = [...favoritesCo];
          newTab.push(comic._id);

          const response = await axios.post(
            `${baseUrl}/changeFavorite`,
            {
              favoriteComics: newTab,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoritesCo(response.data.favoriteComics);
          Cookies.set(
            "favoritesCo",
            JSON.stringify(response.data.favoriteComics),
            {
              expires: 10,
              secure: true,
            }
          );
        } else {
          //remove
          const newTab = favoritesCo.filter(
            (favorite) => favorite !== comic._id
          );

          const response = await axios.post(
            `${baseUrl}/changeFavorite`,
            {
              favoriteComics: newTab,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setFavoritesCo(response.data.favoriteComics);
          Cookies.set(
            "favoritesCo",
            JSON.stringify(response.data.favoriteComics),
            {
              expires: 10,
              secure: true,
            }
          );
        }

        setIsFavorite(!isFavorite);
      } catch (error) {
        console.log("catch comic component>>>>", error.response);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card">
      <div className="firstElement">
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />

        <div>
          <h2>{comic.title}</h2>
          <p>{comic.description}</p>
        </div>
      </div>

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

export default Comic;
