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
          <div className="perPage">
            <p
              onClick={() => {
                setLimit(20);
              }}
              className={limit === 20 ? "bold" : undefined}
            >
              20
            </p>
            <p> - </p>
            <p
              onClick={() => {
                setLimit(40);
              }}
              className={limit === 40 ? "bold" : undefined}
            >
              40
            </p>
            <p> - </p>
            <p
              onClick={() => {
                setLimit(60);
              }}
              className={limit === 60 ? "bold" : undefined}
            >
              60
            </p>
            <p> - </p>
            <p
              onClick={() => {
                setLimit(80);
              }}
              className={limit === 80 ? "bold" : undefined}
            >
              80
            </p>
            <p> - </p>
            <p
              onClick={() => {
                setLimit(100);
              }}
              className={limit === 100 ? "bold" : undefined}
            >
              100
            </p>
            éléments par page
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
            />
            sur {numberOfPages} pages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
