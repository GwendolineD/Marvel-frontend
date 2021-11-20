import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Character = ({ character, favoritesCh, setFavoritesCh, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoritesCh.indexOf(character._id) !== -1) {
      setIsFavorite(true);
    }
  }, [character, favoritesCh]);

  // const addFavorite = () => {
  //   if (!isFavorite) {
  //     const newTab = [...favorites];
  //     newTab.push(character._id);
  //     localStorage.setItem("favoritesCh", JSON.stringify(newTab));
  //     setFavorites(newTab);
  //   } else {
  //     const newTab = favorites.filter((favorite) => favorite !== character._id);
  //     localStorage.setItem("favoritesCh", JSON.stringify(newTab));
  //     setFavorites(newTab);
  //   }
  //   setIsFavorite(!isFavorite);
  // };

  const favorite = async () => {
    try {
      if (!isFavorite) {
        const newTab = [...favoritesCh];
        newTab.push(character._id);
        // localStorage.setItem("favoritesCh", JSON.stringify(newTab));
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
        console.log("add fav>>>", response.data);
        setFavoritesCh(newTab);
      } else {
        const newTab = favoritesCh.filter(
          (favorite) => favorite !== character._id
        );
        // localStorage.setItem("favoritesCh", JSON.stringify(newTab));
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
        console.log("remove fav>>>", response.data);
        setFavoritesCh(newTab);
      }

      // const response = await axios.post(
      //   "https://marvel-backend-gwendoline.herokuapp.com/changeFavorite",
      //   {
      //     favoriteCharacters: favoritesCh,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // console.log(response.data);
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
