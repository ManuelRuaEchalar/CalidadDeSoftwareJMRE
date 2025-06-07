<?php
// Datos de conexión
$host = '127.0.0.1';
$db   = 'registro';
$user = 'root';
$pass = '';
$mysqli = new mysqli($host, $user, $pass, $db);
if ($mysqli->connect_errno) {
    die("Error de conexión: " . $mysqli->connect_error);
}

// Si llegan datos POST, insertamos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $carnet     = $mysqli->real_escape_string($_POST['carnet']);
    $nombres    = $mysqli->real_escape_string($_POST['nombres']);
    $apellidos  = $mysqli->real_escape_string($_POST['apellidos']);
    $sexo       = $mysqli->real_escape_string($_POST['sexo']);
    $fecha_nac  = $mysqli->real_escape_string($_POST['fecha_nac']);
    $profesion  = $mysqli->real_escape_string($_POST['profesion']);
    $celular    = $mysqli->real_escape_string($_POST['celular']);
    $direccion  = $mysqli->real_escape_string($_POST['direccion']);

    $sql = "INSERT INTO personas 
            (carnet,nombres,apellidos,sexo,fecha_nac,profesion,celular,direccion)
            VALUES 
            ('$carnet','$nombres','$apellidos','$sexo','$fecha_nac','$profesion','$celular','$direccion')";
    $mysqli->query($sql) or die($mysqli->error);
}

// Obtenemos todos los registros
$res = $mysqli->query("SELECT * FROM personas ORDER BY apellidos, nombres");

echo '<table border="1" cellpadding="5">';
echo '<tr>
        <th>Carnet</th><th>Nombres</th><th>Apellidos</th><th>Sexo</th>
        <th>Fecha Nac.</th><th>Profesión</th><th>Celular</th><th>Dirección</th>
      </tr>';
while($row = $res->fetch_assoc()){
    echo "<tr>
            <td>{$row['carnet']}</td>
            <td>{$row['nombres']}</td>
            <td>{$row['apellidos']}</td>
            <td>{$row['sexo']}</td>
            <td>{$row['fecha_nac']}</td>
            <td>{$row['profesion']}</td>
            <td>{$row['celular']}</td>
            <td>{$row['direccion']}</td>
          </tr>";
}
echo '</table>';

$mysqli->close();
?>
