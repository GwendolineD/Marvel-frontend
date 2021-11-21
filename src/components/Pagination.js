const Pagination = ({
  pageActive,
  setPageActive,
  numberOfPages,
  limit,
  setLimit,
  numberOfResults,
}) => {
  return (
    <div>
      <div className="pagination">
        <div>
          <p>{numberOfResults} resultats</p>
        </div>

        <div>
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
            éléments par page page
          </div>

          <div>
            <input
              onChange={(event) => {
                setPageActive(
                  event.target.value === "" ? 1 : event.target.value
                );
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
      </div>
    </div>
  );
};

export default Pagination;
