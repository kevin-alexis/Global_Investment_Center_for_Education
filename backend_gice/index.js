const express = require('express');
const app = express(); //Servidor
// const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//Para aplicar un middleware a todas las rutas de una aplicación Express, se utiliza el método app.use()

// Middleware para analzar el cuerpo de la solicitud en formato JSON y lo convierte en un objeto JavaScript
app.use(bodyParser.json());

// Middleware que habilitar CORS (Cross-Origin Resource Sharing) para todas las rutas
app.use(cors());

//Credenciales de MySQL
const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    port: 3307
}

// Ruta principal
app.get('/', (req, res) =>{
    res.send('Hola mundo!');
})

// Iniciar el servidor, escucha en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
})