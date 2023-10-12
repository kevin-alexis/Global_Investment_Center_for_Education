import sql from 'mysql';
import config from './config.js'; // Asegúrate de que config.js tiene la configuración adecuada

const pool = new sql.createConnection(config);
pool.connect();

export default pool;