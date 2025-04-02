const { calcularArea } = require('../src/area.js');

describe('calcularArea', () => {
  test('Prueba 1: radio positivo (r = 5)', () => {
    const resultado = calcularArea(5);
    // Math.PI * 5^2 = Math.PI * 25 ≈ 78.5398
    expect(resultado).toBeCloseTo(78.53981633974483, 5);
  });

  test('Prueba 2: radio cero (r = 0)', () => {
    const resultado = calcularArea(0);
    expect(resultado).toBe(0);
  });

});