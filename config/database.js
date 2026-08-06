const { Pool } = require('pg');
require('dotenv').config();

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