const { pool } = require('../config/database');

async function findAll() {
    const result = await pool.query(`
        SELECT p.*, c.nome as cliente_nome 
        FROM pedidos p
        LEFT JOIN clientes c ON p.cliente_id = c.id
        ORDER BY p.id DESC
    `);
    return result.rows;
}

async function findById(id) {
    const result = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    return result.rows[0];
}

async function create(pedido) {
    const { cliente_id, total, status } = pedido;
    const result = await pool.query(
        'INSERT INTO pedidos (cliente_id, total, status) VALUES ($1, $2, $3) RETURNING *',
        [cliente_id, total || 0, status || 'pendente']
    );
    return result.rows[0];
}

async function updateStatus(id, status) {
    const result = await pool.query(
        'UPDATE pedidos SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
}

async function deleteById(id) {
    const result = await pool.query(
        'UPDATE pedidos SET status = $1 WHERE id = $2 RETURNING *',
        ['cancelado', id]
    );
    return result.rows[0];
}

module.exports = { findAll, findById, create, updateStatus, deleteById };