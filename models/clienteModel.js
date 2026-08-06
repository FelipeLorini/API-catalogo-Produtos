const { pool } = require('../config/database');

async function findAll() {
    const result = await pool.query('SELECT * FROM clientes WHERE ativo = true ORDER BY id DESC');
    return result.rows;
}

async function findById(id) {
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0];
}

async function create(cliente) {
    const { nome, email, telefone, endereco } = cliente;
    const result = await pool.query(
        'INSERT INTO clientes (nome, email, telefone, endereco, ativo) VALUES ($1, $2, $3, $4, true) RETURNING *',
        [nome, email, telefone, endereco]
    );
    return result.rows[0];
}

async function update(id, cliente) {
    const { nome, email, telefone, endereco } = cliente;
    const result = await pool.query(
        'UPDATE clientes SET nome = $1, email = $2, telefone = $3, endereco = $4 WHERE id = $5 RETURNING *',
        [nome, email, telefone, endereco, id]
    );
    return result.rows[0];
}

async function deleteById(id) {
    const result = await pool.query(
        'UPDATE clientes SET ativo = false WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = { findAll, findById, create, update, deleteById };