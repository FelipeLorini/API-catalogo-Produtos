const { pool } = require('../config/database');

async function findAll() {
    const result = await pool.query('SELECT * FROM categorias WHERE ativo = true ORDER BY id DESC');
    return result.rows;
}

async function findById(id) {
    const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
    return result.rows[0];
}

async function create(categoria) {
    const { nome, descricao } = categoria;
    const result = await pool.query(
        'INSERT INTO categorias (nome, descricao, ativo) VALUES ($1, $2, true) RETURNING *',
        [nome, descricao]
    );
    return result.rows[0];
}

async function update(id, categoria) {
    const { nome, descricao } = categoria;
    const result = await pool.query(
        'UPDATE categorias SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
        [nome, descricao, id]
    );
    return result.rows[0];
}

async function deleteById(id) {
    const result = await pool.query(
        'UPDATE categorias SET ativo = false WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = { findAll, findById, create, update, deleteById };