# Global Investment Center for Education
Global Investment Center for Education: Aplicación Orientada a Servicios que permita a las personas aprender sobre finanzas y economía. Mediante el consumo de APIs presentar los precios de las monedas, noticias importantes que generen cambios en las divisas y archivos para poder aprender más sobre inversiones.

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript
- React
- MySQL
- Node.js con Express

## APIs Utilizadas

### NEWSAPI

Implementamos esta API para ofrecer noticias globales actualizadas, permitiendo que los usuarios estén al tanto de los eventos actuales. Esto les brinda la capacidad de prever posibles impactos en sus inversiones al tener acceso a información relevante y oportuna.

API endpoint: Obtiene todas las noticias relacionadas con economía.

```js
GET https://newsapi.org/v2/everything?domains=wsj.com&apiKey=API_KEY 
```


### EXCHANGERATE-API

Esta API se ha incorporado para ofrecer datos sobre los valores de las monedas. Los usuarios pueden seguir de cerca las fluctuaciones en los valores de las monedas, lo que les permite tomar decisiones informadas sobre sus inversiones y comprender mejor el panorama financiero.

API endpoint: Obtiene los tipos de cambio de su código base a todas las demás monedas que admiten.

```js
GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/MXN 
```

### COINRANKING API

Se ha integrado para proporcionar información sobre tasas de cambio de criptomonedas. Esto resulta valioso para inversores y entusiastas de las criptomonedas que desean seguir de cerca estas tasas de cambio, facilitando decisiones financieras fundamentadas y una comprensión más detallada.

API endpoint: Obtiene toda la información sobre criptomonedas.

```js
 GET https://coinranking1.p.rapidapi.com/coins
```

## Configuración

### Iniciar el Frontend

1. Ejecuta `npm start` en la terminal.

2. Añade un archivo `.env` con la siguiente configuración:

```js
REACT_APP_URL_API=http://localhost:8080
```

### Iniciar el Backend

1. Ejecuta `npx nodemon server.js` en la terminal.

2. Añade un archivo `.env` con la siguiente configuración:

```js
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=GICE
DB_PORT=3306
```

