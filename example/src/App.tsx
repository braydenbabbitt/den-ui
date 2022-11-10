import React, { useEffect, useState } from 'react';
import { Button, useDestructibleLocalStorage } from 'den-ui';
import './App.css';

function App() {
  const [testStorage, setTestStorage, isStored] = useDestructibleLocalStorage<string | undefined>('testKey', undefined);
  const localStorageValue = localStorage.getItem('testKey') ?? '';

  return (
    <main>
      <h1>Test</h1>
      <Button
        onClick={() => {
          setTestStorage(testStorage ? undefined : 'test');
          console.log({ isStored });
        }}
      >
        {testStorage ? 'Delete Local Storage' : 'Write Local Storage'}
      </Button>
      <h2>State value: {testStorage}</h2>
      <h2>Local storage value: {localStorageValue}</h2>
      <h2>isStored value: {`${isStored}`}</h2>
    </main>
  );
}

export default App;
