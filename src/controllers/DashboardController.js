const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    index: (req, res) => {
        const jobs = Job.get();
        const profile = Profile.get();

        const statusCount = {
            total: jobs.length,
            progress: 0,
            done: 0,
        };

        // Total de horas por dia de cada job em progresso
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            const daysToDeadline = JobUtils.calculateDaysToDeadline(job);
            const status = daysToDeadline <= 0 ? 'done' : 'progress';

            statusCount[status]++;

            if (status == 'progress') jobTotalHours += Number(job['daily-hours']);

            const hourlyRate = profile['hourly-rate'];
            const price = JobUtils.calculatePrice(job, hourlyRate);

            return {
                ...job,
                daysToDeadline,
                status,
                price,
            };
        });

        // Quantidade de horas que quero trabalhar por dia menos a quantidade de horas requeridas por projeto em progresso

        const freeHours = profile['hours-per-day'] - jobTotalHours;

        return res.render('index', {
            jobs: updatedJobs,
            profile: profile,
            statusCount: statusCount,
            freeHours: freeHours,
        });
    },
};
