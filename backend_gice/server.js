// const app = require('./app.js');
// const port = 8080;


// // Iniciar el servidor, escucha en el puerto 8080
// app.listen(port, () => {
//     console.log(`Servidor iniciado en el puerto ${port}`);
// })

const express = require('express');
const app = express();
const port = 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
