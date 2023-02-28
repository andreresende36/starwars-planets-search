import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/apiServices';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState('');

  useEffect(() => {
    getPlanets().then((data) => data.map((planet) => {
      delete planet.residents;
      return planet;
    })).then((filteredData) => {
      setPlanets(filteredData);
      setKeys(Object.keys(filteredData[0]));
    });
  }, []);

  const filterPlanetsByName = (search) => {
    const newPlanetsArray = planets.filter(
      (planet) => planet.name.toUpperCase().includes(search.toUpperCase()),
    );
    setFilteredPlanets(newPlanetsArray);
  };

  const filterPlanetsByStats = (column, comparison, value, nrFilters) => {
    let arrayToBeFiltered = [];
    if (nrFilters === 1) {
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

  return (
    <PlanetsContext.Provider
      value={ {
        planets: filteredPlanets || planets,
        keys,
        filterPlanetsByName,
        filterPlanetsByStats,
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
