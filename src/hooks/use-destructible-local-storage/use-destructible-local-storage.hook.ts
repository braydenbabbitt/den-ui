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
  defaultValue?: T,
  useStoredValueFirst = true,
  storeDefaultValueInitially = false,
) => {
  type ValueType = typeof defaultValue;
  const [state, setState] = useState<ValueType>(
    useStoredValueFirst ? (getDeserializedStoredValue(key) as ValueType) : defaultValue,
  );

  const storeValue = useCallback(
    (value: ValueType | ((prevValue: ValueType) => ValueType) | undefined) => {
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
        } else {
          localStorage.removeItem(key);
        }
        setState(value);
      }
    },
    [key, defaultValue],
  );

  useEffect(() => {
    if (storeDefaultValueInitially) {
      storeValue(defaultValue);
    }
  }, [defaultValue, storeDefaultValueInitially, storeValue]);

  return [state, storeValue] as const;
};
