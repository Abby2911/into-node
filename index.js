// 1. Importar el modulo de node 
// HTTP
import http from 'http';
//Biblioteca path
import path from 'path';

//Recreando Built-In Variables 
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.join(__dirname, path.basename(new URL(import.meta.url).pathname));

// 2. Crear el servidor 
const server = http.createServer( (_, res) => {
    //Logica del servidor
    // 1. Respondiendo al Cliente
    res.write(`
    __dirname: ${__dirname}
    __filename: ${__filename}`);
  
    // 2. Cerrar la conexion 
    res.end();
} );

// 3. Arrancamos el servidor 
server.listen(3000, "0.0.0.0", () => {
    console.log(" 🤩🤩 Servidor escuchando en http://localhost3000");
} );