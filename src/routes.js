const express = require('express');
const routes = express.Router();

// Em vez disso:
// const views = __dirname + '/views';
// adicionar ao server: server.set('views', path.join(__dirname, 'views'));
// e trocar os paths apenas para os nomes dos arquivos

const profile = {
    name: 'Vitor',
    avatar: 'https://github.com/vitorhonna.png',
    'monthly-budget': 5000,
    'days-per-week': 5,
    'hours-per-day': 8,
    'vacation-per-year': 4,
    'hourly-rate': 75,
};

const jobs = [
    {
        id: 1,
        name: 'Pizzaria Guloso',
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
];

// Calcular o tempo restante de projeto
function calculateDaysToDeadline(job) {
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
}

// request, response
routes.get('/', (req, res) => {
    const updatedJobs = jobs.map((job) => {
        const daysToDeadline = calculateDaysToDeadline(job);
        // console.log(daysToDeadline);
        const status = daysToDeadline <= 0 ? 'done' : 'progress';
        // const status = 'done';
        const projectPrice = profile['hourly-rate'] * job['total-hours'];

        return {
            ...job,
            daysToDeadline,
            status,
            projectPrice,
        };
    });

    return res.render('index', { jobs: updatedJobs });
});

routes.get('/job', (req, res) => res.render('job'));

routes.post('/job', (req, res) => {
    // Estrutura: { name: 'JobName', 'daily-hours': '1', 'total-hours': '5' }

    // Procura o último elemento e, se ele existir, acessa seu id, se não existir, atribui 1
    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now(),
    });

    return res.redirect('/');
});

routes.get('/job/edit', (req, res) => res.render('job-edit'));
routes.get('/profile', (req, res) => res.render('profile', { profile }));

module.exports = routes;
