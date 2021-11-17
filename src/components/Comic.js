const Comic = ({ comic }) => {
  return (
    <div className="card">
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt="comic Marvel"
      />
      <h2>{comic.title}</h2>
      <p>{comic.description}</p>
    </div>
  );
};

export default Comic;
