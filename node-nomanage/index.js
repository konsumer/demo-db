const { Database } = require('sqlite3')

const db = new Database(process.env.DATABASE_URI.replace(/^sqlite:\/\//, ''))

const testDb = () => new Promise((resolve, reject) => db.all('SELECT 1+1 as result', (err, rows) => err ? reject(err) : resolve(rows[0].result)))

module.exports = (req, res) => {
  testDb()
    .then(results => {
      res.end(`Hello from node-nomanage. Your database is at ${process.env.DATABASE_URI}. The database responded with ${results}.`)
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