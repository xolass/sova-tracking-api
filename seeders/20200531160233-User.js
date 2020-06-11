
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    username: 'Admin',
    password: '$2b$10$.qiefTl.COkwuO6m2EcNWesh4v6cAGej/XLmx8WAoQ8XpISCabOQC', // 123
    token: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
