import React from 'react';
import Provider from './context/Provider';
import FilterOptions from './components/FilterOptions';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <Header />
        <div className="planets-info-container">
          <FilterOptions />
          <Table />
        </div>
      </div>
    </Provider>
  );
}

export default App;
