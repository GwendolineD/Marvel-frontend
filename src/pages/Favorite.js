// import Cookies from "js-cookie";

import Character from "../components/Character";

const Favorite = ({ favoriteCharacters, setFavoriteCharacters }) => {
  // const cookieFavorite = Cookies.get("favorites");
  console.log("cookie favorite>>>", favoriteCharacters);

  return (
    <div>
      <h2>Personnages favoris</h2>
      <div className="container">
        {favoriteCharacters.map((character, index) => {
          return (
            <Character
              key={character._id}
              character={character}
              favorites={favoriteCharacters}
              setFavorites={setFavoriteCharacters}
            />
          );
        })}
      </div>
      <h2>Comics favoris</h2>
      <div className="container">
        {/* {favoriteCharacters.map((character, index) => {
          return (
            <Character
              key={character._id}
              character={character}
              favorites={favoriteCharacters}
              setFavorites={setFavoriteCharacters}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default Favorite;
