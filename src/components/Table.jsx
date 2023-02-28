import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Planet from './Planet';

function Table() {
  const [loading, setLoading] = useState(true);
  const { planets, keys } = useContext(PlanetsContext);

  useEffect(() => (planets.length === 0
    ? setLoading(true)
    : setLoading(false)
  ), [planets]);

  const handleKeys = (key) => {
    const arrayString = key.split('_');
    const newArray = arrayString.map((string) => {
      const firstLetter = string.charAt(0);
      const newString = string.replace(firstLetter, firstLetter.toUpperCase());
      return newString;
    });
    return newArray.join(' ');
  };

  const planetsTable = (
    <table>
      <thead>
        <tr>
          { loading
            ? null
            : keys.map((key, index) => (<th key={ index }>{ handleKeys(key) }</th>)) }
        </tr>
      </thead>
      <tbody>
        {
          planets.map((planet) => (
            <Planet
              key={ planet.name }
              name={ planet.name }
              rotationPeriod={ planet.rotation_period }
              orbitalPeriod={ planet.orbital_period }
              diameter={ planet.diameter }
              climate={ planet.climate }
              gravity={ planet.gravity }
              terrain={ planet.terrain }
              surfaceWater={ planet.surface_water }
              population={ planet.population }
              films={ planet.films }
              created={ planet.created }
              edited={ planet.edited }
              url={ planet.url }
            />
          ))
        }
      </tbody>
    </table>
  );

  return (
    <div className="table">
      { loading
        ? (<span>Carregando...</span>)
        : planetsTable }
    </div>
  );
}

export default Table;
