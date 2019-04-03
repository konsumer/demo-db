const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URI)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = (req) => 'Hello from node (with sequelize)'