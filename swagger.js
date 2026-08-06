const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Catalogo de Produtos',
      version: '2.0.0',
      description: 'API REST para gerenciamento de catalogo de produtos'
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Servidor de producao'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Produto: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
            preco: { type: 'number' },
            estoque: { type: 'integer' },
            categoria_id: { type: 'integer' },
            ativo: { type: 'boolean' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        },
        Categoria: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
            ativo: { type: 'boolean' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        },
        Cliente: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            email: { type: 'string' },
            telefone: { type: 'string' },
            endereco: { type: 'string' },
            ativo: { type: 'boolean' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        },
        Pedido: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            cliente_id: { type: 'integer' },
            data_pedido: { type: 'string' },
            status: { type: 'string' },
            total: { type: 'number' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            email: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [process.cwd() + '/**/*.js']
};

module.exports = swaggerJsdoc(options);
