const Database = require('../db/config');

module.exports = {
    get: async () => {
        const db = await Database();

        const data = await db.get(`SELECT * FROM profile`);

        await db.close();

        // Normalização dos dados:
        const normalizedData = {
            name: data.name,
            avatar: data.avatar,
            'monthly-budget': data.monthly_budget,
            'days-per-week': data.days_per_week,
            'hours-per-day': data.hours_per_day,
            'vacation-per-year': data.vacation_per_year,
            'hourly-rate': data.hourly_rate,
        };

        return normalizedData;
    },

    update: async (newData) => {
        const db = await Database();

        db.run(`
            UPDATE profile SET
                name = "${newData.name}",
                avatar = "${newData.avatar}",
                monthly_budget = ${newData['monthly-budget']},
                days_per_week = ${newData['days-per-week']},
                hours_per_day = ${newData['hours-per-day']},
                vacation_per_year = ${newData['vacation-per-year']},
                hourly_rate = ${newData['hourly-rate']}
        `);

        await db.close();
    },
};
