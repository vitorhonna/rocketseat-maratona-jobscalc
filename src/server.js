const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');

// habilita o ejs (template engine)
server.set('view engine', 'ejs');

// define o path para a pasta views, facilitando a definição das rotas
server.set('views', path.join(__dirname, 'views'));

// middleware - habilita os arquivos estáticos (public)
server.use(express.static('public'));

// permitir o recebimento do corpo da requisição (req.body)
server.use(express.urlencoded({ extended: true }));

// routes
server.use(routes);

// server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT} 🚀`));
