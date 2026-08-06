const dns = require('node:dns');
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

testConnection().then((conectado) => {
    if (conectado) {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
        });
    } else {
        console.error('Servidor nao iniciado devido a erro de conexao com MySQL');
        process.exit(1);
    }
});