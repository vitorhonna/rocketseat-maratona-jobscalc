const Database = require('./config');

const initDb = {
    async init() {
        // Abrir conexão com o banco de dados
        const db = await Database();

        await db.exec(`
            CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hour_per_day INT,
                vacation_per_year INT,
                hourly_rate INT
            );
        `);

        await db.exec(`
            CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            );
        `);

        await db.run(`
            INSERT INTO profile (
                name, 
                avatar, 
                monthly_budget,
                days_per_week,
                hour_per_day,
                vacation_per_year
            ) VALUES (
                "Vitor Honna",
                "https://github.com/vitorhonna.png",
                5000,
                5,
                6,
                4
            );
        `);

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Pizzaria",
                2,
                1,
                1617514376018
            );
        `);

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "OneTwo Project",
                3,
                47,
                1617514376018
            );
        `);

        // Fechar conexão com o banco de dados
        await db.close();
    },
};

initDb.init();
