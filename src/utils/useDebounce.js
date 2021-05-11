import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(intervalId);
  }, [value]);

  return debouncedValue;
};
