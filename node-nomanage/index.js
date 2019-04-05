const { Database } = require('sqlite3')

const db = new Database(process.env.DATABASE_URI.replace(/^sqlite:\/\//, ''))

const query = q => new Promise((resolve, reject) => db.all(q, (err, rows) => err ? reject(err) : resolve(rows)))

const run = async () => {
  const r = await query('SELECT 1+1 AS result')
  console.log(r[0].result)
}
run()

module.exports = (req, res) => {
  res.end(`Hello from node-nomanage. Your database is at ${process.env.DATABASE_URI}. I tried to touch it.`)
}