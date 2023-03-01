import { screen, render, waitFor } from "@testing-library/react";
import getPlanets from '../services/apiServices'
import App from '../App';

jest.setTimeout(15000);

describe('Teste do componente Planet.jsx', () => {
  it('Testa se os planetas renderizados na tabela são os mesmos que foram carregados da API', async () => {
    render(<App />);
    const apiPlanets = await getPlanets();
    const arrayNamesPlanets = apiPlanets.map((item) => item.name);
    const renderedPlanets = await screen.findAllByTestId('planet-name');
    const namesRenderedPlanets = [...renderedPlanets].map((item) => item.innerHTML);
    expect(arrayNamesPlanets).toEqual(namesRenderedPlanets);
  });
})