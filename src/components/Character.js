import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Cookies from "js-cookie";

const Character = ({ character, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // const cookieFavorite = Cookies.get("favorites");
    //     if (cookieFavorite) {
    //       Cookies.remove("favorite");
    //       console.log("coocki remove");
    //     }
    const addFavorite = () => {
      if (isFavorite) {
        const newTab = [...favorites];
        newTab.push(character);
        setFavorites(newTab);
        // Cookies.set("favorites", newTab, { expires: 1, secure: true });
      }
      // else {
      //   const newTab = favorites.filter(
      //     (favorite) => favorite._id !== character._id
      //   );
      //   setFavorites(newTab);
      // }
    };
    addFavorite();
  }, [isFavorite]);

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
      <input
        onChange={() => {
          setIsFavorite(!isFavorite);
        }}
        type="checkbox"
        checked={isFavorite}
      />
    </div>
  );
};

export default Character;
