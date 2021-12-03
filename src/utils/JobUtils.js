module.exports = {
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
};
