const { pool } = require('../config/database');

async function findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
}

async function create(usuario) {
    const { nome, email, senha } = usuario;
    const result = await pool.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, senha]
    );
    return result.rows[0];
}

async function findById(id) {
    const result = await pool.query('SELECT id, nome, email, created_at, updated_at FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = { findByEmail, create, findById };