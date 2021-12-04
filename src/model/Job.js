let data = [
    {
        id: 1,
        name: 'Pizzaria',
        'daily-hours': 2,
        'total-hours': 1,
        created_at: Date.now(),
    },
    {
        id: 2,
        name: 'OneTwo Project',
        'daily-hours': 2,
        'total-hours': 47,
        created_at: Date.now(),
    },
    {
        id: 3,
        name: 'Rocketseat Discover',
        'daily-hours': 5,
        'total-hours': 50,
        created_at: Date.now(),
    },
];

module.exports = {
    get: () => data,
    update: (newData) => (data = newData),
    delete: (id) => {
        data = data.filter((job) => Number(job.id) !== Number(id));
    },
};
