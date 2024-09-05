import knex from "knex";

export const knexClient = knex({
    client: 'pg',
    connection: 'postgres://user:password@postgres:5432/mydatabase'
});
