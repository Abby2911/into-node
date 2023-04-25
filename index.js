// 1. Importar el modulo de node 
// HTTP
import http from 'http';

// 2. Crear el servidor 
const server = http.createServer( (req, res) => {
    //Logica del servidor
    // 1. Respondiendo al Cliente
    res.write("Hello from the server...");
    // 2. Cerrar la conexion 
    res.end();
} );

// 3. Arrancamos el servidor 
server.listen(3000, "0.0.0.0", () => {
    console.log("Servidor escuchando en http://localhost3000");
} );