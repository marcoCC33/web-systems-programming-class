import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

// NODE leerá el archivo .env y cargará las variables
dotenv.config();

// Crear y exportar el pool de conexiones
export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Configuración adicional del pool
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mensaje de confirmación de conexión
console.log("Database connection established correctly.");