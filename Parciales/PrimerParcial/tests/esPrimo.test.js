const { esPrimo } = require('../src/esPrimo.js');

describe('Función esPrimo', () => {
  test('Prueba 1: Número primo (n = 7)', () => {
    expect(esPrimo(7)).toBe(true);
  });

  test('Prueba 2: Número no primo (n = 6)', () => {
    expect(esPrimo(6)).toBe(false);
  });

  test('Prueba 3: Número negativo (n = -3)', () => {
    expect(esPrimo(-3)).toBe(false);
  });

});