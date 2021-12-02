const job = {
    id: 1,
    name: 'Pizzaria',
    'daily-hours': 2,
    'total-hours': 1,
    price: 300,
    date: 1231241323421,
};

const updatedJob = {
    id: 1,
    name: 'Cafe',
    'daily-hours': 5,
    'total-hours': 100,
};
console.log('--------------------------');
console.log(job);
console.log(updatedJob);

console.log('--------------------------');
for (let item in updatedJob) {
    job[item] = updatedJob[item];
}
console.log('--------------------------');

console.log(job);
console.log(updatedJob);
