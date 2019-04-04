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

module.exports = (req, res) => {
  res.end(`Hello from node. Your database is at ${process.env.DATABASE_URI}. I tried to touch it.`)
}
