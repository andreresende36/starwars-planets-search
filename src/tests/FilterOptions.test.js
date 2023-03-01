import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import getPlanets from '../services/apiServices'
import App from '../App';

jest.setTimeout(15000);

describe('Teste do componente FilterOptions.jsx', () => {
  beforeEach(async () => {
    render(<App />);
  });
  it('Teste do filtro por nome', async () => {
    await waitForElementToBeRemoved(screen.getByTestId('loading'), { timeout: 15000})
    const searchInput = screen.getByTestId('name-filter');
    userEvent.type(searchInput, 'boo');
    const planetsFiltered = screen.getAllByTestId('planet-name');
    expect(planetsFiltered[0]).toHaveTextContent(/naboo/i);
  })

  it('Testa se os filtros de coluna estão corretos', async() => {
    const mockColumnFilter = [
      'population',
      'diameter',
      'surface_water',
      'orbital_period',
      'rotation_period']
    const columnFilter = screen.getByTestId('column-filter');
    const arrayOfFilters = [...columnFilter].map((item) => item.innerHTML)
    expect(mockColumnFilter).toEqual(arrayOfFilters);
  })

  it('Testa se os operadores estão corretos', async() => {
    const mockComparisonFilter = [
      'maior que',
      'menor que',
      'igual a']
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const arrayOfFilters = [...comparisonFilter].map((item) => item.innerHTML)
    expect(mockComparisonFilter).toEqual(arrayOfFilters);
  })

  it.only('Testa se o botão "FILTRAR" está funcionando corretamente', async () => {
    await waitForElementToBeRemoved(screen.getByTestId('loading'), { timeout: 15000})
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    const removeFiltersButton = screen.getByTestId('button-remove-filters');
    
    // 1º filtro
    userEvent.selectOptions(columnFilter,'diameter');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter,'4900');
    userEvent.click(filterButton);
    
    const result1 = screen.getAllByTestId('planet-name');
    expect(result1.length).toBe(1);
    expect(result1[0].innerHTML).toBe('Endor')
    userEvent.click(removeFiltersButton);
    userEvent.clear(valueFilter);

    // 2º filtro
    userEvent.selectOptions(columnFilter,'population');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '300000');
    userEvent.click(filterButton);
    
    const result2 = screen.getAllByTestId('planet-name');
    expect(result2.length).toBe(2);
    expect(result2[0].innerHTML).toBe('Tatooine');
    expect(result2[1].innerHTML).toBe('Yavin IV');
    userEvent.click(removeFiltersButton);
    userEvent.clear(valueFilter);

    // 3º filtro
    userEvent.selectOptions(columnFilter,'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '500');
    userEvent.click(filterButton);
    
    const result3 = screen.getAllByTestId('planet-name');
    expect(result3.length).toBe(3);
    expect(result3[0].innerHTML).toBe('Yavin IV');
    expect(result3[1].innerHTML).toBe('Hoth');
    expect(result3[2].innerHTML).toBe('Bespin');
    userEvent.click(removeFiltersButton);
    userEvent.clear(valueFilter);
  })

  it('', () => {
    
  })

  it('', () => {
    
  })

  it('', () => {
    
  })
})