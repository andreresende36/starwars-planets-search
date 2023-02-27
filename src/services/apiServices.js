const API_URL = 'https://swapi.dev/api/planets';

const getPlanets = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
};

export default getPlanets;
