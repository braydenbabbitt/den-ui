import React from 'react';
import { Button, useDestructableLocalStorage } from 'den-ui';
import './App.css';

function App() {
  const [testStorage, setTestStorage] = useDestructableLocalStorage<string | undefined>('testKey', undefined);
  const localStorageValue = localStorage.getItem('testKey') ?? '';

  console.info([testStorage, localStorageValue]);

  return (
    <main>
      <h1>Test</h1>
      <Button
        onClick={() => {
          setTestStorage(testStorage ? undefined : 'test');
        }}
      >
        Write Local Storage
      </Button>
      <h2>State value: {testStorage}</h2>
      <h2>Local storage value: {localStorageValue}</h2>
    </main>
  );
}

export default App;
