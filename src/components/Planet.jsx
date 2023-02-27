import React from 'react';

function Planet(props) {
  return (
    <tr className="planet">
      {Object.values(props).map((column, index) => (
        <td key={ `column${index}` }>{ column }</td>
      ))}
    </tr>
  );
}

export default Planet;
