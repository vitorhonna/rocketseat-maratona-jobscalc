const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    renderAddJobPage: (req, res) => {
        return res.render('job');
    },

    createJob: async (req, res) => {
        // const jobs = await Job.get();

        // Procura o último elemento e, se ele existir (?), acessa seu id, se não existir (||), atribui 1
        // const lastId = jobs[jobs.length - 1]?.id || 0;

        await Job.create({
            // id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now(),
        });

        return res.redirect('/');
    },

    renderEditJobPage: async (req, res) => {
        const jobs = await Job.get();
        const profile = await Profile.get();

        const jobId = req.params.id;
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send('Job not found!');
        }

        const hourlyRate = profile['hourly-rate'];
        job.price = JobUtils.calculatePrice(job, hourlyRate);

        return res.render('job-edit', { job });
    },

    update: async (req, res) => {
        const jobId = req.params.id;

        const updatedJob = {
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours'],
        };

        await Job.update(updatedJob, jobId);

        // return res.redirect(`/job/${jobId}`);
        return res.redirect('/');
    },

    delete: async (req, res) => {
        const jobId = req.params.id;

        await Job.delete(jobId);

        return res.redirect('/');
    },
};
