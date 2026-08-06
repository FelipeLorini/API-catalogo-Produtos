const { Pool } = require('pg');
require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : 'NAO DEFINIDA');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Conectado ao PostgreSQL com sucesso!');
        client.release();
        return true;
    } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error.message);
        return false;
    }
}

module.exports = { pool, testConnection };
