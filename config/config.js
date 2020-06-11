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
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    port: '5432',
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
    },

  },
  production: {
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: '5432',
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
    },
  },
};
