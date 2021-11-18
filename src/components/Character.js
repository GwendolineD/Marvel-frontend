import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Character = ({ character, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.indexOf(character._id) !== -1) {
      setIsFavorite(true);
    }
  }, [character, favorites]);

  const addFavorite = () => {
    if (!isFavorite) {
      const newTab = [...favorites];
      newTab.push(character._id);
      localStorage.setItem("favoritesCh", JSON.stringify(newTab));
      setFavorites(newTab);
    } else {
      const newTab = favorites.filter((favorite) => favorite !== character._id);
      localStorage.setItem("favoritesCh", JSON.stringify(newTab));
      setFavorites(newTab);
    }
    setIsFavorite(!isFavorite);
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
      <input onChange={addFavorite} type="checkbox" checked={isFavorite} />
    </div>
  );
};

export default Character;
