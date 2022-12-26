export const useTypedJSONEncoding = <T = any>(customErrorFn?: (error: unknown) => void) => {
  const stringifyTypedJSON = (json: T) => {
    try {
      return JSON.stringify(json);
    } catch (error) {
      if (customErrorFn instanceof Function) {
        customErrorFn(error);
      } else {
        console.error(error);
      }
    }
    return undefined;
  };

  // Trigger release
  const parseTypedJSON = (encodedJSON: string) => {
    try {
      if (encodedJSON) {
        return JSON.parse(encodedJSON) as T;
      }
    } catch (error) {
      if (customErrorFn instanceof Function) {
        customErrorFn(error);
      } else {
        console.error(error);
      }
    }
    return undefined;
  };

  return { stringifyTypedJSON, parseTypedJSON };
};
