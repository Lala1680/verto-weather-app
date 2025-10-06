import { useState } from 'react';

export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const convertTemp = (tempCelsius: number) => {
    if (unit === 'fahrenheit') {
      return (tempCelsius * 9) / 5 + 32;
    }
    return tempCelsius;
  };

  return { unit, toggleUnit, convertTemp };
};
