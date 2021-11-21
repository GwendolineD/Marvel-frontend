import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = ({ comic, favoritesCo, setFavoritesCo, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoritesCo.indexOf(comic._id) !== -1) {
      setIsFavorite(true);
    }
  }, [comic, favoritesCo]);

  const favorite = async () => {
    try {
      if (!isFavorite) {
        const newTab = [...favoritesCo];
        newTab.push(comic._id);

        const response = await axios.post(
          "https://marvel-backend-gwendoline.herokuapp.com/changeFavorite",
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
        const newTab = favoritesCo.filter((favorite) => favorite !== comic._id);

        const response = await axios.post(
          "https://marvel-backend-gwendoline.herokuapp.com/changeFavorite",
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
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      <div className="firstElement">
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt="comic Marvel"
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
      {/* <input
        className="checkFavorite"
        onChange={favorite}
        type="checkbox"
        checked={isFavorite}
      /> */}
    </div>
  );
};

export default Comic;
