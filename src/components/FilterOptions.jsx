import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFilterHook from '../hooks/useFilterHook';

function FilterOptions() {
  const { filterPlanetsByName, filterPlanetsByStats } = useContext(PlanetsContext);
  const column = useFilterHook('population');
  const comparison = useFilterHook('maior que');
  const quantity = useFilterHook(0);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'search':
      filterPlanetsByName(value);
      break;
    case 'column-filter':
      column.setFilter(value);
      break;
    case 'comparison-filter':
      comparison.setFilter(value);
      break;
    case 'value-filter':
      quantity.setFilter(value);
      break;
    default:
      return null;
    }
  };

  const handleClick = () => {
    filterPlanetsByStats(column.filter, comparison.filter, quantity.filter);
  };

  return (
    <div className="filter-options">
      <div>
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
      <div>
        <label htmlFor="column-filter">
          Coluna
          <select
            id="column-filter"
            name="column-filter"
            data-testid="column-filter"
            onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="diameter">diameter</option>
            <option value="surface_water">surface_water</option>
            <option value="orbital_period">orbital_period</option>
            <option value="rotation_period">rotation_period</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            id="comparison-filter"
            name="comparison-filter"
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="value-filter"
          data-testid="value-filter"
          value={ quantity.filter }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          FILTRAR
        </button>
      </div>
    </div>
  );
}

export default FilterOptions;
