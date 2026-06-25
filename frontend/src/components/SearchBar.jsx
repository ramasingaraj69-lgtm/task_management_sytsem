function SearchBar({

  search,
  setSearch

}) {

  return (

    <input
      type="text"
      placeholder="Search Tasks..."
      className="form-control mb-4"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

export default SearchBar;