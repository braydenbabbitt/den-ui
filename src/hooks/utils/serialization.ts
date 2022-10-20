export const serializeValue = <T>(value: T) => {
  if (typeof value !== 'string') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw new Error('Failed to serialize value used in useLocalStorage');
    }
  }
  return value;
};

export const deserializeValue = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
