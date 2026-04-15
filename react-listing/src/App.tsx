import React from 'react';
import Listing, { type Item } from './components/Listing'; 
import data from './data/etsy.json';
import './App.css';

const items: Item[] = data as unknown as Item[];

const App: React.FC = () => {
  return (
    <div className="container">
      <Listing items={items} />
    </div>
  );
}

export default App;