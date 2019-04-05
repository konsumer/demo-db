const express = require('express')

// primes the dependency for ncc/now
const sql = require('sqlite3')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URI)

const testDb = () => sequelize
  .authenticate()
  .then(() => {
    return sequelize.query("SELECT 1+1 AS result").then(([results, metadata]) => {
      return results[0].result
    })
  })

testDb()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch(e => {
    console.error('there was an error connecting to database.')
  })

const app = express()
app.get('*', (req, res) => {
  testDb()
    .then(results => {
      res.end(`Hello from node-server. Your database is at ${process.env.DATABASE_URI}. The database responded with ${results}.`)
    })
    .catch(err => {
      res.end(`Unable to connect to the database: ${err.message}`, 500)
    })
})

app.listen()
