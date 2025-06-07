const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
// 🛠️ Middleware para procesar datos POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar vistas y carpeta estática
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'registro'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Ruta principal: muestra formulario y lista
app.get('/', (req, res) => {
  const query = 'SELECT * FROM personas ORDER BY apellidos, nombres';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('personas', { personas: results });
  });
});

// Función para limpiar nombres de campos con caracteres especiales
function limpiarCampos(objeto) {
  const resultado = {};
  
  for (const [key, value] of Object.entries(objeto)) {
    // Limpia los caracteres especiales (\r\n) del nombre del campo
    const keyLimpia = key.replace(/[\r\n]/g, '');
    resultado[keyLimpia] = value;
  }
  
  return resultado;
}

// Ruta POST: insertar nuevo registro
app.post('/registrar', (req, res) => {
  // Limpiar nombres de campos que contienen \r\n
  const datosLimpios = limpiarCampos(req.body);
  
  console.log("Datos recibidos (originales):", req.body);
  console.log("Datos procesados (limpios):", datosLimpios);
  
  const { carnet, nombres, apellidos, sexo, fecha_nac, profesion, celular, direccion } = datosLimpios;
  
  const query = `INSERT INTO personas 
    (carnet,nombres,apellidos,sexo,fecha_nac,profesion,celular,direccion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [carnet, nombres, apellidos, sexo, fecha_nac, profesion, celular, direccion];

  db.query(query, values, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});