import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFilterHook from '../hooks/useFilterHook';

function FilterOptions() {
  const initialArray = [
    'population',
    'diameter',
    'surface_water',
    'orbital_period',
    'rotation_period'];
  const [columnsFilterArray, setColumnsFilterArray] = useState(initialArray);
  const {
    filterPlanetsByName,
    filterByNumericValues,
    setFilterByNumericValues,
    order,
    setOrder,
    sortPlanets } = useContext(PlanetsContext);
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
    case 'column-sort':
      setOrder({ column: value, sort: order.sort });
      break;
    case 'sort':
      setOrder({ column: order.column, sort: value });
      break;
    default:
      return null;
    }
  };

  useEffect(() => {
    filterByNumericValues.forEach((filter) => {
      const newArray = columnsFilterArray.filter((item) => item !== filter.column);
      setColumnsFilterArray(newArray);
      column.setFilter(newArray[0]);
    });
  }, [filterByNumericValues]);

  const handleClick = () => {
    setFilterByNumericValues([...filterByNumericValues,
      { column: column.filter,
        comparison: comparison.filter,
        value: quantity.filter }]);
  };

  const handleDeleteButton = ({ target: { value } }) => {
    const newFilters = filterByNumericValues.filter((filter) => filter.column !== value);
    setFilterByNumericValues(newFilters);
    setColumnsFilterArray(initialArray);
  };

  const handleClearFilters = () => {
    setFilterByNumericValues([]);
  };

  return (
    <div className="filter-options">
      <div className="filter-options-first-row">
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
      <div className="filter-options-second-row">
        <label htmlFor="column-filter">
          Coluna
          <select
            id="column-filter"
            name="column-filter"
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {columnsFilterArray.map((item) => (
              <option value={ item } key={ item }>{item}</option>
            ))}
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
        <label htmlFor="column-sort">
          Ordenar
          <select
            id="column-sort"
            name="column-sort"
            value={ order.column }
            onChange={ handleChange }
            data-testid="column-sort"
          >
            {initialArray.map((item) => (
              <option value={ item } key={ item }>{item}</option>
            ))}
          </select>
        </label>
        <div>
          <label htmlFor="ASC">
            <input
              type="radio"
              name="sort"
              id="ASC"
              value="ASC"
              onChange={ handleChange }
              data-testid="column-sort-input-asc"
              checked={ order.sort === 'ASC' }
            />
            Ascendente
          </label>
          <label htmlFor="DESC">
            <input
              type="radio"
              name="sort"
              id="DESC"
              value="DESC"
              onChange={ handleChange }
              data-testid="column-sort-input-desc"
              checked={ order.sort === 'DESC' }
            />
            Descendente
          </label>
        </div>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => sortPlanets() }
        >
          ORDENAR
        </button>
        <button
          type="button"
          onClick={ handleClearFilters }
          data-testid="button-remove-filters"
        >
          REMOVER FILTROS
        </button>
      </div>
      <div className="filter-options-third-row">
        {filterByNumericValues.map((filter) => (
          <p className="filter" data-testid="filter" key={ filter.column }>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              className="delete-filter-button"
              onClick={ handleDeleteButton }
              value={ filter.column }
            >
              X
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default FilterOptions;
