import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/apiServices';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const filterPlanetsByName = (search) => {
    const newPlanetsArray = planets.filter(
      (planet) => planet.name.toUpperCase().includes(search.toUpperCase()),
    );
    setFilteredPlanets(newPlanetsArray);
  };

  const filterPlanetsByStats = (column, comparison, value, nrFilters) => {
    let arrayToBeFiltered = [];
    if (nrFilters === 0) {
      arrayToBeFiltered = planets;
    } else {
      arrayToBeFiltered = filteredPlanets;
    }
    const newPlanetsArray = arrayToBeFiltered.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return null;
      }
    });
    setFilteredPlanets(newPlanetsArray);
  };

  useEffect(() => {
    getPlanets().then((data) => data.map((planet) => {
      delete planet.residents;
      return planet;
    })).then((filteredData) => {
      setPlanets(filteredData);
      setKeys(Object.keys(filteredData[0]));
    });
    if (filterByNumericValues.length === 0) {
      setFilteredPlanets('');
    } else {
      filterByNumericValues.forEach(
        (filter, index) => filterPlanetsByStats(
          filter.column,
          filter.comparison,
          filter.value,
          index,
        ),
      );
    }
  }, [filterByNumericValues]);

  const sorter = (array, column, sort) => {
    const sortedPlanets = [];
    if (sort === 'ASC') {
      sortedPlanets.push([...array.sort((a, b) => {
        const first = a[column] === 'unknown'
          ? Infinity : Number(a[column]);
        const second = b[column] === 'unknown'
          ? Infinity : Number(b[column]);
        return first - second;
      })]);
    } else {
      sortedPlanets.push([...array.sort((a, b) => {
        const first = a[column] === 'unknown'
          ? -Infinity : Number(a[column]);
        const second = b[column] === 'unknown'
          ? -Infinity : Number(b[column]);
        return second - first;
      })]);
    }
    console.log([...sortedPlanets[0]]);
    return [...sortedPlanets[0]];
  };

  const sortPlanets = () => {
    let sortedPlanets = [];
    if (filterByNumericValues.length === 0) {
      sortedPlanets = sorter(planets, order.column, order.sort);
    } else {
      sortedPlanets = sorter(filteredPlanets, order.column, order.sort);
    }
    setFilteredPlanets(sortedPlanets);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets: filteredPlanets || planets,
        keys,
        filterPlanetsByName,
        filterByNumericValues,
        setFilterByNumericValues,
        order,
        setOrder,
        sortPlanets,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
