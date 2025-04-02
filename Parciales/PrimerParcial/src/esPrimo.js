function esPrimo(n) {
    if (n <= 1) return false;
    for (let i = 2, limite = Math.sqrt(n); i <= limite; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { esPrimo };
  }
  