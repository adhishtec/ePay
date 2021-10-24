import * as React from 'react';
import Tab from './components/Tab';
import Search from './components/Search';

export function App() {
  return (
    // Main file loading other component
    <>
      <Search />
      <Tab />
    </>
  );
}
