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

  test('Prueba 3: radio negativo (r = -3)', () => {
    expect(() => calcularArea(-3)).toThrow("El radio no puede ser negativo");
  });

  test('Prueba 4: radio grande (r = 1000)', () => {
    const resultado = calcularArea(1000);
    // Math.PI * 1000^2 = Math.PI * 1,000,000 ≈ 3141592.653589793
    expect(resultado).toBeCloseTo(3141592.653589793, 5);
  });

  test('Prueba 5: radio decimal (r = 3.5)', () => {
    const resultado = calcularArea(3.5);
    // Math.PI * 3.5^2 = Math.PI * 12.25 ≈ 38.4845
    expect(resultado).toBeCloseTo(38.48451000647496, 5);
  });

});