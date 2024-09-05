import {Knex} from "knex";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            database: 'mydatabase',
            user: 'user',
            password: 'password',
            host: 'postgres',
            port: 5432
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
            extension: 'ts'
        }
    }
};

export default config;
