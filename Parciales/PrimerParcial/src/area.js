function calcularArea(radio) {
    if (radio < 0) {
      throw new Error("El radio no puede ser negativo");
    }
    return Math.PI * Math.pow(radio, 2);
  }
  
  // Exportamos la función para poder usarla en las pruebas con Jest
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcularArea };
  }
  