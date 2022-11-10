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

  const getIsStored = () => {
    return localStorage.getItem(key) !== null;
  };

  const storeValue = useCallback(
    (value?: T | ((prevValue: T) => T | undefined) | undefined) => {
      if (value instanceof Function) {
        setState((prevState) => {
          const newState = value(prevState);
          if (newState !== undefined) {
            localStorage.setItem(key, serializeValue(newState));
            return newState;
          } else {
            localStorage.removeItem(key);
            return defaultValue;
          }
        });
      } else {
        if (value !== undefined) {
          localStorage.setItem(key, serializeValue(value));
          setState(value);
        } else {
          localStorage.removeItem(key);
          setState(defaultValue);
        }
      }
    },
    [key, defaultValue],
  );

  useEffect(() => {
    if (storeDefaultValueInitially) {
      storeValue(defaultValue);
    }
  }, [defaultValue, storeDefaultValueInitially, storeValue]);

  return [state, storeValue, getIsStored] as const;
};
