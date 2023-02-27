import React from 'react';

function Planet(props) {
  return (
    <tr>
      {Object.values(props).map((column, index) => (
        <td key={ `column${index}` }>{ column }</td>
      ))}
    </tr>
  );
}

export default Planet;
