import { Link } from "react-router-dom";

const Character = ({ character }) => {
  // console.log();
  return (
    // <div className="card">
    <Link to={`/comics/${character._id}`} className="card">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt="personnage"
      />

      <h2>{character.name}</h2>
      <p>{character.description}</p>
    </Link>
    // </div>
  );
};

export default Character;
