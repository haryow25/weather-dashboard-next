const KELVIN_TO_CELSIUS = 273.15;

export const convertToCelsius = kelvin =>
  (kelvin - KELVIN_TO_CELSIUS).toFixed(0);
