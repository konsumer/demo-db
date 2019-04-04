module.exports = (req, res) => {
  res.end(`Hello from node-nodb. Your database is at ${process.env.DATABASE_URI}, but I didn't touch it.`)
}