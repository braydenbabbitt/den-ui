import { useCallback, useEffect, useState } from 'react';
import { deserializeValue, serializeValue } from '../utils/serialization';

export const useDestructableLocalStorage = <T = string>(key: string, defaultValue: T, useInitialStoredValue = true) => {
  const initialStoredValue = localStorage.getItem(key);
  const [value, setValue] = useState<T>(
    useInitialStoredValue ? (initialStoredValue ? deserializeValue(initialStoredValue) : defaultValue) : defaultValue,
  );

  const storeValue = useCallback(
    (value: T | ((prevValue: T) => T | undefined) | undefined = undefined) => {
      if (value instanceof Function) {
        setValue((prev) => {
          const result = value(prev);
          if (result) {
            localStorage.setItem(key, serializeValue(result));
            return result;
          } else {
            localStorage.removeItem(key);
            return defaultValue;
          }
        });
      } else {
        if (value) {
          localStorage.setItem(key, serializeValue(value));
        } else {
          localStorage.removeItem(key);
        }
        setValue(value ?? defaultValue);
      }
    },
    [key, defaultValue],
  );

  useEffect(() => {
    storeValue(value);
  }, [defaultValue, value, storeValue]);

  return [value, storeValue] as const;
};
