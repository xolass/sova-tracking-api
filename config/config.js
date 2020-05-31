require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEVELOPMENT,
    password: process.env.DB_PASSWORD_DEVELOPMENT,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    port: 5432,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
    },

  },
  test: {
    username: process.env.DB_NAME_TEST,
    password: process.env.DB_HOST_TEST,
    database: process.env.DB_USERNAME_TEST,
    port: '5432',
    host: process.env.DB_PASSWORD_TEST,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
    },

  },
  production: {
    username: process.env.DB_NAME_PRODUCTION,
    password: process.env.DB_HOST_PRODUCTION,
    database: process.env.DB_USERNAME_PRODUCTION,
    host: process.env.DB_PASSWORD_PRODUCTION,
    port: '5432',
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
    },
  },
};
