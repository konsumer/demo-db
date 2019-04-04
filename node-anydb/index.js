const { createConnection } = require('any-db')

const db = createConnection(process.env.DATABASE_URI.replace(/^sqlite:/, 'sqlite3:'))

// promisify doesn't seem to work here
const query = q => new Promise((resolve, reject) => {
  db.query(q, (err, res) => err ? reject(err) : resolve(res))
})

const main = async () => {
  const result = await query('SELECT 1 + 1 AS result')
  console.log('got result', result.rows[0].result)
}
main()

module.exports = (req, res) => {
  res.end('Hello from node-anydb.')
}