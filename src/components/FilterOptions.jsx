import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterOptions() {
  const { filterPlanets } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    filterPlanets(value);
  };

  return (
    <div className="filter-options">
      <label htmlFor="search">
        Projeto Star Wars - Trybe
        <br />
        <input
          type="text"
          id="search"
          name="search"
          onChange={ handleChange }
          placeholder="Filtrar por nome"
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default FilterOptions;
