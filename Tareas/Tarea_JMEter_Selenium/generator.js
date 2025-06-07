const fs = require('fs');
const path = require('path');

// Arrays con datos para generar información aleatoria
const nombres = [
  'Juan', 'Ana', 'Carlos', 'María', 'Luis', 'Laura', 'José', 'Patricia', 'Miguel', 'Sofía',
  'Fernando', 'Gabriela', 'Eduardo', 'Daniela', 'Alberto', 'Valentina', 'Roberto', 'Lucía',
  'Ricardo', 'Camila', 'Francisco', 'Adriana', 'Antonio', 'Natalia', 'Jorge', 'Julia'
];

const apellidos = [
  'Pérez', 'Gómez', 'López', 'Rodríguez', 'Martínez', 'García', 'Fernández', 'Sánchez',
  'Torres', 'Ramírez', 'Vargas', 'Herrera', 'Gutiérrez', 'Morales', 'Castro', 'Ortiz',
  'Rivera', 'Mendoza', 'Flores', 'Ruiz', 'Cruz', 'Navarro', 'Jiménez', 'Díaz', 'Romero'
];

const profesiones = [
  'Ingeniero', 'Abogada', 'Médico', 'Arquitecta', 'Profesor', 'Diseñadora', 'Contador',
  'Enfermera', 'Programador', 'Psicóloga', 'Electricista', 'Administrativa', 'Vendedor',
  'Consultora', 'Técnico', 'Secretaria', 'Mecánico', 'Chef', 'Empresario', 'Bióloga'
];

const direcciones = [
  'Calle Falsa 123', 'Avenida Siempre Viva 742', 'Carrera 7 #65-42', 'Paseo Reforma 222',
  'Calle Principal 56', 'Avenida Central 890', 'Boulevard Norte 77', 'Calle 52 #10-85',
  'Avenida Sur 435', 'Circuito Interior 67', 'Pasaje Oeste 12', 'Calle 10 #34-56',
  'Avenida Este 78', 'Carrera 15 #45-23', 'Boulevard La Paz 90', 'Calle 25 de Mayo 77',
  'Avenida Libertad 85', 'Carrera 70 #23-67', 'Calle San Martín 44', 'Avenida Kennedy 321'
];

// Funciones de utilidad
function obtenerElementoAleatorio(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generarFechaNacimiento() {
  // Generar fechas entre 1960 y 2000
  const año = 1960 + Math.floor(Math.random() * 40);
  const mes = 1 + Math.floor(Math.random() * 12);
  const dia = 1 + Math.floor(Math.random() * 28); // Simplificado para evitar problemas con meses
  
  // Formato YYYY-MM-DD
  return `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
}

function generarCelular() {
  // Generar número de 8 dígitos empezando con 7
  let numero = '7';
  for (let i = 0; i < 7; i++) {
    numero += Math.floor(Math.random() * 10);
  }
  return numero;
}

function generarCarnet(index) {
  // Formato: C001, C002, ..., C500
  return `C${(index + 1).toString().padStart(3, '0')}`;
}

// Función principal para generar el CSV
function generarCSV(cantidadRegistros, archivoSalida) {
  // Encabezado del CSV
  let contenidoCSV = 'carnet,nombres,apellidos,sexo,fecha_nac,profesion,celular,direccion\n';
  
  // Generar registros
  for (let i = 0; i < cantidadRegistros; i++) {
    const sexo = Math.random() > 0.5 ? 'M' : 'F';
    const nombre = obtenerElementoAleatorio(nombres);
    const apellido = obtenerElementoAleatorio(apellidos);
    const profesion = obtenerElementoAleatorio(profesiones);
    
    // Construir el registro
    const registro = [
      generarCarnet(i),                 // Carnet único
      nombre,                           // Nombre
      apellido,                         // Apellido
      sexo,                             // Sexo (M/F)
      generarFechaNacimiento(),         // Fecha de nacimiento
      profesion,                        // Profesión
      generarCelular(),                 // Número de celular
      obtenerElementoAleatorio(direcciones) // Dirección
    ].join(',');
    
    // Añadir registro al CSV
    contenidoCSV += registro + '\n';
  }
  
  // Escribir archivo
  fs.writeFileSync(archivoSalida, contenidoCSV);
  
  console.log(`Archivo CSV generado correctamente: ${archivoSalida}`);
  console.log(`Se generaron ${cantidadRegistros} registros.`);
  
  // Mostrar muestra de los datos generados
  const lineas = contenidoCSV.split('\n');
  console.log('\nMuestra de datos generados:');
  console.log(lineas[0]); // Encabezado
  console.log(lineas[1]); // Primer registro
  console.log(lineas[2]); // Segundo registro
  console.log('...');
  console.log(lineas[lineas.length - 2]); // Último registro válido
}

// Obtener argumentos o usar valores predeterminados
const cantidadRegistros = process.argv[2] || 500;
const archivoSalida = process.argv[3] || 'datos_generados.csv';

// Ejecutar la generación
generarCSV(parseInt(cantidadRegistros), archivoSalida);