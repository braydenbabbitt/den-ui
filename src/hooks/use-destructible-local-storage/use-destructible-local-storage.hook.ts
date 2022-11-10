import { useCallback, useEffect, useState } from 'react';
import { deserializeValue, serializeValue } from '../utils/serialization';

const getDeserializedStoredValue = (key: string) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    return undefined;
  }
  return deserializeValue(storedValue);
};

export const useDestructibleLocalStorage = <T>(
  key: string,
  defaultValue: T,
  useStoredValueFirst = true,
  storeDefaultValueInitially = false,
) => {
  const [state, setState] = useState<T>(
    useStoredValueFirst ? getDeserializedStoredValue(key) ?? defaultValue : defaultValue,
  );
  const [isStored, setIsStored] = useState<boolean>(storeDefaultValueInitially || localStorage.getItem(key) !== null);

  const storeValue = useCallback(
    (value?: T | ((prevValue: T) => T | undefined) | undefined) => {
      if (value instanceof Function) {
        setState((prevState) => {
          const newState = value(prevState);
          if (newState !== undefined) {
            localStorage.setItem(key, serializeValue(newState));
            setIsStored(true);
            return newState;
          } else {
            localStorage.removeItem(key);
            setIsStored(false);
            return defaultValue;
          }
        });
      } else {
        if (value !== undefined) {
          localStorage.setItem(key, serializeValue(value));
          setIsStored(true);
          setState(value);
        } else {
          localStorage.removeItem(key);
          setIsStored(false);
          setState(defaultValue);
        }
      }
    },
    [key, defaultValue, setIsStored],
  );

  useEffect(() => {
    if (storeDefaultValueInitially) {
      storeValue(defaultValue);
    }
  }, [defaultValue, storeDefaultValueInitially, storeValue]);

  return [state, storeValue, isStored] as const;
};
