import path from "path";
import { promises as fs } from 'fs';

export default async (req, res) => {
    // Desestructurando de "req"
    let { url, method } = req;

    console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

    // Enrutando peticiones
    switch (url) {
        case '/':
            // Peticion raiz
            // Estableciendo cabeceras
            res.setHeader('Content-Type', 'text/html');
            // Escribiendo la respuesta
            res.write(``);
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 200;
            // Cerrando la comunicacion
            res.end();
            break;

        case '/author':
            // Peticion raiz
            // Estableciendo cabeceras
            res.setHeader('Content-Type', 'text/html');
            let url_image = 'https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=';
            // Escribiendo la respuesta
            res.write(``);
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 200;
            // Cerrando la comunicacion
            res.end();
            break;

        case "/favicon.ico":
            // Especificar la ubicación del archivo de icono
            const faviconPath = path.join(__dirname, 'favicon.ico');
            try {
                const data = await fs.readFile(faviconPath);
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            } catch (err) {
                console.error(err);
                // Peticion raiz
                // Estableciendo cabeceras
                res.setHeader('Content-Type', 'text/html');
                // Escribiendo la respuesta
                res.write(``);
                console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
                console.log(`📣 ERROR: 500 ${err.message}`);
                // Estableciendo codigo de respuesta
                res.statusCode = 500;
                // Cerrando la comunicacion
                res.end();
            }
            break;

        case "/message":
            // Verificando si es post
            if (method === "POST") {
                // Se crea una variable para almacenar los
                // Datos entrantes del cliente
                let body = "";
                // Se registra un manejador de eventos
                // Para la recepción de datos
                req.on("data", (data => {
                    body += data;
                    if (body.length > 1e6) return req.socket.destroy();
                }));
                // Se registra una manejador de eventos
                // para el termino de recepción de datos
                req.on("end", () => {
                    // Procesa el formulario
                    // Mediante URLSearchParams se extraen
                    // los campos del formulario
                    const params = new URLSearchParams(body);
                    // Se construye un objeto a partir de los datos
                    // en la variable params
                    const parsedParams = Object.fromEntries(params);
                    // Almecenar el mensaje en un archivo
                    fs.writeFile('message.txt', parsedParams.message);
                })

                // Establecer un codigo de respuesta 
                // Para redireccionamiento
                res.statusCode = 302;
                // Estableciendo en redireccionamiento
                res.setHeader('Location', '/');
                // Se finaliza la conexion
                return res.end();

            } else {
                res.statusCode = 404;
                res.write("404: Endpoint no encontrado")
                res.end();
            }
            break;

        case "/index":
            const indexPath = path.join(__dirname, 'views');
            try {
                const data = await fs.readFile(indexPath);
                res.writeHead(200, { 'Content-Type': 'index.html' });
                res.end(data);
            } catch (err) {
                console.error(err);
                // Peticion raiz
                // Estableciendo cabeceras
                res.setHeader('Content-Type', 'text/html');
                // Escribiendo la respuesta
                res.write(``);
                console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
                console.log(`📣 ERROR: 500 ${err.message}`);
                // Estableciendo codigo de respuesta
                res.statusCode = 500;
                // Cerrando la comunicacion
                res.end();
            }
            break;

        case "/author":
            const authorPath = path.join(__dirname, 'views');
            try {
                const data = await fs.readFile(authorPath);
                res.writeHead(200, { 'Content-Type': 'author.html' });
                res.end(data);
            } catch (err) {
                console.error(err);
                // Peticion raiz
                // Estableciendo cabeceras
                res.setHeader('Content-Type', 'text/html');
                // Escribiendo la respuesta
                res.write(``);
                console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
                console.log(`📣 ERROR: 500 ${err.message}`);
                // Estableciendo codigo de respuesta
                res.statusCode = 500;
                // Cerrando la comunicacion
                res.end();
            }
            break;

        case "/index":
            const htmlPath = path.join(__dirname, 'views');
            try {
                const data = await fs.readFile(htmlPath);
                res.writeHead(200, { 'Content-Type': 'index.html' });
                res.end(data);
            } catch (err) {
                console.error(err);
                // Peticion raiz
                // Estableciendo cabeceras
                res.setHeader('Content-Type', 'text/html');
                // Escribiendo la respuesta
                res.write(``);
                console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
                console.log(`📣 ERROR: 500 ${err.message}`);
                // Estableciendo codigo de respuesta
                res.statusCode = 500;
                // Cerrando la comunicacion
                res.end();
            }
            break;


        default:
            // Peticion raiz
            // Estableciendo cabeceras
            res.setHeader('Content-Type', 'text/html');
            // Escribiendo la respuesta
            res.write(`
        <html>
          <head>
            <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
            <title>My App</title>
          </head>
          <body> 
            <h1>&#128534; 404 Recurso no encontrado</h1>
            <p>Lo sentimos pero no tenemos lo que buscas...</p>
          </body>
        </html>
        `);
            console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 404;
            // Cerrando la comunicacion
            res.end();
            break;
    }
}