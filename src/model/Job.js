const Database = require('../db/config');

module.exports = {
    get: async () => {
        const db = await Database();

        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close();

        // Normalizar dados
        const normalizedData = jobs.map((job) => {
            return {
                id: job.id,
                name: job.name,
                'daily-hours': job.daily_hours,
                'total-hours': job.total_hours,
                created_at: job.created_at,
            };
        });

        return normalizedData;
    },

    update: async (updatedJob, jobId) => {
        const db = await Database();

        await db.run(`
            UPDATE jobs SET
                name = "${updatedJob.name}",
                daily_hours = ${updatedJob['daily-hours']},
                total_hours = ${updatedJob['total-hours']}
            WHERE id = ${jobId}
        `);

        await db.close();
    },

    delete: async (id) => {
        const db = await Database();

        await db.run(`DELETE FROM jobs WHERE id = ${id}`);

        await db.close();
    },

    create: async (newJob) => {
        const db = await Database();

        await db.run(`
            INSERT INTO jobs (
                name, 
                daily_hours, 
                total_hours, 
                created_at
            ) VALUES (
                "${newJob.name}",
                ${newJob['daily-hours']},
                ${newJob['total-hours']},
                ${newJob.created_at}
            )
        `);

        await db.close();
    },
};
