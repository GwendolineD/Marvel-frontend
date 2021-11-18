import { useState, useEffect } from "react";

const Comic = ({ comic, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.indexOf(comic._id) !== -1) {
      setIsFavorite(true);
    }
  }, [comic, favorites]);

  const addFavorite = () => {
    if (!isFavorite) {
      const newTab = [...favorites];
      newTab.push(comic._id);
      localStorage.setItem("favoritesCo", JSON.stringify(newTab));
      setFavorites(newTab);
    } else {
      const newTab = favorites.filter((favorite) => favorite !== comic._id);
      localStorage.setItem("favoritesCo", JSON.stringify(newTab));
      setFavorites(newTab);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt="comic Marvel"
      />
      <h2>{comic.title}</h2>
      <p>{comic.description}</p>
      <input onChange={addFavorite} type="checkbox" checked={isFavorite} />
    </div>
  );
};

export default Comic;
