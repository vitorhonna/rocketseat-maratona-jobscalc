const Profile = require('../model/Profile');

module.exports = {
    renderProfilePage: async (req, res) => {
        return res.render('profile', { profile: await Profile.get() });
    },

    update: async (req, res) => {
        const newData = req.body;

        const workWeeksPerYear = 52 - newData['vacation-per-year'];
        const workWeeksPerMonth = workWeeksPerYear / 12;
        const workHoursPerWeek = newData['hours-per-day'] * newData['days-per-week'];
        const workHoursPerMonth = workHoursPerWeek * workWeeksPerMonth;

        const hourlyRate = newData['monthly-budget'] / workHoursPerMonth;

        const profile = await Profile.get();

        await Profile.update({
            ...profile,
            ...newData,
            'hourly-rate': hourlyRate,
        });

        return res.redirect('/profile');
    },
};
