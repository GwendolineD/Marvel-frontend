const Pagination = ({
  pageActive,
  setPageActive,
  numberOfPages,
  limit,
  setLimit,
}) => {
  return (
    <div>
      {" "}
      <div>
        <input
          onChange={(event) => {
            setLimit(event.target.value === "" ? 1 : event.target.value);
          }}
          type="number"
          value={limit}
          min="1"
          max="100"
        />{" "}
        de comics par page
      </div>
      <div className="container">
        page{" "}
        <input
          onChange={(event) => {
            setPageActive(event.target.value === "" ? 1 : event.target.value);
            console.log(event.target.value);
          }}
          type="number"
          value={pageActive}
          min="1"
          max={numberOfPages}
        />{" "}
        sur {numberOfPages} pages
      </div>
    </div>
  );
};

export default Pagination;
