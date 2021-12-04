const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

routes.get('/', DashboardController.index);
routes.get('/job', JobController.renderAddJobPage);
routes.post('/job', JobController.createJob);
routes.get('/job/:id', JobController.renderEditJobPage);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.renderProfilePage);
routes.post('/profile', ProfileController.update);

module.exports = routes;

// ANOTAÇÕES:

// Para determinar um caminho padrao para as páginas, em vez disso:
// const views = __dirname + '/views'; (e em seguida concatenar ao nome de cada página)
// adicionar ao server: server.set('views', path.join(__dirname, 'views'));
// e trocar os paths apenas para os nomes dos arquivos
// Obs: Também é preciso importar o path: const path = require('path');
