import { Link } from "react-router-dom";
import { useState } from "react";
// import Cookies from "js-cookie";

const Character = ({ character, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const addFavorite = () => {
    if (!isFavorite) {
      // console.log("favorites avant>>>", favorites);
      const newTab = [...favorites];
      newTab.push(character._id);
      // console.log("favorites après>>>", newTab);

      // console.log("stringify>>>", JSON.stringify(newTab));
      localStorage.setItem("favorites", JSON.stringify(newTab));
      setFavorites(newTab);

      // si déja dans favoris >>>alert
    } else {
      // console.log("favorites delete avant>>>", favorites);
      const newTab = favorites.filter((favorite) => favorite !== character._id);
      // console.log("favorites delete après>>>", newTab);
      localStorage.setItem("favorites", JSON.stringify(newTab));
      setFavorites(newTab);
    }
    setIsFavorite(!isFavorite);
  };

  // const cookieFavorite = Cookies.get("favorites");
  // console.log(cookieFavorite);
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
      <input onChange={addFavorite} type="checkbox" checked={isFavorite} />
    </div>
  );
};

export default Character;
