const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');

const Job = {
    data: [
        {
            id: 1,
            name: 'Pizzaria',
            'daily-hours': 2,
            'total-hours': 1,
            created_at: Date.now(),
        },
        {
            id: 2,
            name: 'OneTwo Project',
            'daily-hours': 3,
            'total-hours': 47,
            created_at: Date.now(),
        },
        {
            id: 3,
            name: 'Rocketseat Discover',
            'daily-hours': 5,
            'total-hours': 50,
            created_at: Date.now(),
        },
    ],
    controllers: {
        index: (req, res) => {
            const updatedJobs = Job.data.map((job) => {
                const daysToDeadline = Job.services.calculateDaysToDeadline(job);
                // console.log(daysToDeadline);
                const status = daysToDeadline <= 0 ? 'done' : 'progress';
                // const status = 'done';

                const hourlyRate = Profile.data['hourly-rate'];
                const price = Job.services.calculatePrice(job, hourlyRate);

                return {
                    ...job,
                    daysToDeadline,
                    status,
                    price,
                };
            });
            return res.render('index', { jobs: updatedJobs, profile: Profile.data });
        },
        renderAddJobPage: (req, res) => {
            return res.render('job');
        },
        createJob: (req, res) => {
            // Estrutura: { name: 'JobName', 'daily-hours': '1', 'total-hours': '5' }

            // Procura o último elemento e, se ele existir, acessa seu id, se não existir, atribui 1
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
                created_at: Date.now(),
            });

            return res.redirect('/');
        },
        renderEditJobPage: (req, res) => {
            const jobId = req.params.id;

            const job = Job.data.find((job) => Number(job.id) === Number(jobId));

            if (!job) {
                return res.send('Job not found!');
            }

            const hourlyRate = Profile.data['hourly-rate'];

            job.price = Job.services.calculatePrice(job, hourlyRate);
            // console.log(job);

            return res.render('job-edit', { job });
        },
        update: (req, res) => {
            const jobId = req.params.id;

            const job = Job.data.find((job) => Number(job.id) === Number(jobId));

            if (!job) {
                return res.send('Job not found!');
            }

            // const updatedJob = {
            //     ...job,
            //     name: req.body.name,
            //     'total-hours': req.body['total-hours'],
            //     'daily-hours': req.body['daily-hours'],
            // };
            // Job.data = Job.data.map((job) => {
            //     if (Number(job.id) === Number(jobId)) {
            //         job = updatedJob;
            //     }
            //     return job;
            // });

            // Talvez seja mais eficiente fazer assim (Perguntar para o Rotta):
            const updatedJob = {
                name: req.body.name,
                'total-hours': req.body['total-hours'],
                'daily-hours': req.body['daily-hours'],
            };

            for (let item in updatedJob) {
                job[item] = updatedJob[item];
            }

            return res.redirect(`/job/${jobId}`);
        },
        delete: (req, res) => {
            const jobId = req.params.id;

            Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

            return res.redirect('/');
        },
    },
    services: {
        // Calcular o tempo restante de projeto
        calculateDaysToDeadline: (job) => {
            const remainingDays = Math.floor(job['total-hours'] / job['daily-hours']);
            // const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
            // console.log(remainingDays);

            const createdDate = new Date(job.created_at);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDate = createdDate.setDate(dueDay);

            const timeDiffInMs = dueDate - Date.now();
            const dayInMs = 24 * 60 * 60 * 1000;
            const timeDiffInDays = Math.floor(timeDiffInMs / dayInMs);

            return timeDiffInDays;
        },
        calculatePrice: (job, hourlyRate) => {
            return hourlyRate * job['total-hours'];
        },
    },
};

routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.renderAddJobPage);
routes.post('/job', Job.controllers.createJob);
routes.get('/job/:id', Job.controllers.renderEditJobPage);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', ProfileController.renderProfilePage);
routes.post('/profile', ProfileController.update);

module.exports = routes;

// ANOTAÇÕES:

// Para determinar um caminho padrao para as páginas, em vez disso:
// const views = __dirname + '/views'; (e em seguida concatenar ao nome de cada página)
// adicionar ao server: server.set('views', path.join(__dirname, 'views'));
// e trocar os paths apenas para os nomes dos arquivos
// Obs: Também é preciso importar o path: const path = require('path');
