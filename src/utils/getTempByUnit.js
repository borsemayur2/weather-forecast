const getTempByUnit = (tempInFahrenheit, tempUnit) => {
  if (tempUnit === "celsius") {
    const tempInCelsius = (5 / 9) * (tempInFahrenheit - 32);
    return Math.round(tempInCelsius);
  }
  return Math.round(tempInFahrenheit);
};

export default getTempByUnit;
