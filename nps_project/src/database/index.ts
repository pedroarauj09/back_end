import {Connection, createConnection,  getConnectionOptions} from 'typeorm';

export default async (): Promise <Connection> => {
    const defaultOptions = await getConnectionOptions(); // get default config of database from ormconfig.json

    return createConnection(
        Object.assign(defaultOptions,{
            database: process.env.NODE_ENV === "test" ? "./src/database/database.test.sqlite" : defaultOptions.database, // Change the database config if its a test action
        })
    )
}