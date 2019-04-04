const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URI)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const app = express()
app.get('*', (req, res) => {
  res.send(`Hello from node-server. Your database is at ${process.env.DATABASE_URI}. I tried to touch it.`)
})

app.listen()
