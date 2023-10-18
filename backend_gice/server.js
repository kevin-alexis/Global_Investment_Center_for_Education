import app from './app.js';
const port = 8080;
import fs from 'fs';

// Verificar si la carpeta uploads existe, si no, crearla
const uploadsFolder = './uploads';
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);

console.log('Carpeta uploads creada.');
}

// Iniciar el servidor, escucha en el puerto 8080
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
})



