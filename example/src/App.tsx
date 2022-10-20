import React from 'react';
import { useDestructableLocalStorage } from 'den-ui';
import './App.css';

function App() {
  const [testStorage, setTestStorage] = useDestructableLocalStorage<string | undefined>('testKey', undefined);

  return (
    <main>
      <h1>Test</h1>
      <button
        onClick={() => {
          setTestStorage(testStorage ? undefined : 'test');
        }}
      ></button>
    </main>
  );
}

export default App;
