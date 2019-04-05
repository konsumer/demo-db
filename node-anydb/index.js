const { createConnection } = require('any-db')

const db = createConnection(process.env.DATABASE_URI.replace(/^sqlite:/, 'sqlite3:'))

const testDb = () => new Promise((resolve, reject) => db.query('SELECT 1+1 as result', (err, r) => err ? reject(err) : resolve(r.rows[0].result)))

module.exports = (req, res) => {
  testDb()
    .then(results => {
      res.end(`Hello from node-anydb. Your database is at ${process.env.DATABASE_URI}. The database responded with ${results}.`)
    })
    .catch(err => {
      res.end(`Unable to connect to the database: ${err.message}`, 500)
    })
}

testDb()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch(e => {
    console.error('there was an error connecting to database.')
  })