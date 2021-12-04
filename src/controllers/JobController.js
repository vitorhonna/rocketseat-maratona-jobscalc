const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    renderAddJobPage: (req, res) => {
        return res.render('job');
    },

    createJob: (req, res) => {
        const jobs = Job.get();

        // Procura o último elemento e, se ele existir (?), acessa seu id, se não existir (||), atribui 1
        const lastId = jobs[jobs.length - 1]?.id || 0;

        Job.create({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now(),
        });

        return res.redirect('/');
    },

    renderEditJobPage: (req, res) => {
        const jobs = Job.get();
        const profile = Profile.get();

        const jobId = req.params.id;
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send('Job not found!');
        }

        const hourlyRate = profile['hourly-rate'];
        job.price = JobUtils.calculatePrice(job, hourlyRate);

        return res.render('job-edit', { job });
    },

    update: (req, res) => {
        const jobs = Job.get();

        const jobId = req.params.id;
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send('Job not found!');
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours'],
        };

        const newData = jobs.map((job) => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }
            return job;
        });

        Job.update(newData);

        // Talvez seja mais eficiente fazer assim (Perguntar para o Rotta):
        // const updatedJob = {
        //     name: req.body.name,
        //     'total-hours': req.body['total-hours'],
        //     'daily-hours': req.body['daily-hours'],
        // };

        // for (let item in updatedJob) {
        //     job[item] = updatedJob[item];
        // }

        // return res.redirect(`/job/${jobId}`);
        return res.redirect('/');
    },

    delete: (req, res) => {
        const jobId = req.params.id;

        Job.delete(jobId);

        return res.redirect('/');
    },
};
