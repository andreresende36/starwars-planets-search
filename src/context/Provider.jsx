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

  const filterPlanets = (search) => {
    const newPlanetsArray = planets.filter(
      (planet) => planet.name.toUpperCase().includes(search.toUpperCase()),
    );
    setFilteredPlanets(newPlanetsArray);
  };

  return (
    <PlanetsContext.Provider
      value={ { planets: filteredPlanets || planets, keys, filterPlanets } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
