import React from "react";

const FilterForm = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      <label>filter show with:</label>
      <input
        name="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default FilterForm;
