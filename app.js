const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Catalogo de Produtos',
        versao: '2.0.0',
        endpoints: {
            docs: '/api-docs',
            api: '/api'
        }
    });
});

app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/produtoRoutes'));
app.use('/api', require('./routes/categoriaRoutes'));
app.use('/api', require('./routes/clienteRoutes'));
app.use('/api', require('./routes/pedidoRoutes'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        erro: 'Erro interno do servidor',
        mensagem: err.message
    });
});

module.exports = app;