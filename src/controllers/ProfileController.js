const Profile = require('../model/Profile');

module.exports = {
    renderProfilePage: (req, res) => {
        return res.render('profile', { profile: Profile.get() });
    },

    update: (req, res) => {
        const newData = req.body;

        const workWeeksPerYear = 52 - newData['vacation-per-year'];
        const workWeeksPerMonth = workWeeksPerYear / 12;
        const workHoursPerWeek = newData['hours-per-day'] * newData['days-per-week'];
        const workHoursPerMonth = workHoursPerWeek * workWeeksPerMonth;

        const hourlyRate = newData['monthly-budget'] / workHoursPerMonth;

        Profile.update({
            ...Profile.get(),
            ...newData,
            'hourly-rate': hourlyRate,
        });

        return res.redirect('/profile');
    },
};
