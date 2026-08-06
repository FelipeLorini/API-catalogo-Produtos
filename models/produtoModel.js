const { pool } = require('../config/database');

async function findAll() {
    const result = await pool.query(`
        SELECT p.*, c.nome as categoria_nome 
        FROM produtos p
        LEFT JOIN categorias c ON p.categoria_id = c.id
        WHERE p.ativo = true
        ORDER BY p.id DESC
    `);
    return result.rows;
}

async function findById(id) {
    const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    return result.rows[0];
}

async function create(produto) {
    const { nome, descricao, preco, estoque, categoria_id } = produto;
    const result = await pool.query(
        `INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id, ativo) 
         VALUES ($1, $2, $3, $4, $5, true) RETURNING *`,
        [nome, descricao, preco, estoque, categoria_id]
    );
    return result.rows[0];
}

async function update(id, produto) {
    const { nome, descricao, preco, estoque, categoria_id } = produto;
    const result = await pool.query(
        `UPDATE produtos SET nome = $1, descricao = $2, preco = $3, estoque = $4, categoria_id = $5 
         WHERE id = $6 RETURNING *`,
        [nome, descricao, preco, estoque, categoria_id, id]
    );
    return result.rows[0];
}

async function deleteById(id) {
    const result = await pool.query(
        'UPDATE produtos SET ativo = false WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = { findAll, findById, create, update, deleteById };