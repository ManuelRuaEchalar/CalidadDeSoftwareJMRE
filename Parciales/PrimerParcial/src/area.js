function calcularArea(radio) {
    if (radio < 0) {
      throw new Error("El radio no puede ser negativo");
    }
    return Math.PI * Math.pow(radio, 2);
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcularArea };
  }
  