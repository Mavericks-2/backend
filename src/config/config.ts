import { DB_PASSWORD, DB_HOST, DB_DATABASE, DB_USERNAME } from "./index";

export default {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: '-06:00',
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: '-06:00',
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: '-06:00',
  },
};
