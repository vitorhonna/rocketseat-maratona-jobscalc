let data = {
    name: 'Vitor',
    avatar: 'https://github.com/vitorhonna.png',
    'monthly-budget': 5000,
    'days-per-week': 5,
    'hours-per-day': 8,
    'vacation-per-year': 4,
    'hourly-rate': 75,
};

module.exports = {
    get: () => data,
    update: (newData) => (data = newData),
};
