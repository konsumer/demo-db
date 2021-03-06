const knex = require('knex')
const { parse } = require('url')
const { decode } = require('querystring')
const { unflatten } = require('flat')

// knex's url parser seems broken
const dbUriParse = (url) => {
  let options = { connection: {} }
  const u = parse(url)
  const { protocol, pathname, hostname, auth, query, port } = u

  options.client = protocol.replace(':', '')
  if (options.client === 'sqlite') {
    options.client = 'sqlite3'
  } else if (options.client === 'postgres' || options.client === 'postgresql') {
    options.client = 'pg'
  }

  if (options.client === 'sqlite3') {
    options.connection.filename = hostname && pathname ? `${hostname}${pathname}` : (hostname || pathname)
    if (options.connection.filename === '/:memory') {
      options.connection.filename = ':memory:'
    }
  } else {
    const [user, password] = auth ? auth.split(':') : []
    options.connection = {
      database: pathname.replace(/^\//, ''),
      host: hostname,
      user,
      password,
      port
    }
  }

  if (query) {
    const q = decode(query)
    const qoptions = {}
    Object.keys(q).forEach(k => {
      qoptions[k] = q[k]
      if (q[k] === 'false') {
        qoptions[k] = false
      }
      if (q[k] === 'true') {
        qoptions[k] = true
      }
      if (!isNaN(q[k])) {
        qoptions[k] = Number(q[k])
      }
    })
    options = { ...options, ...unflatten(qoptions) }
  }

  return options
}

const db = knex(dbUriParse(process.env.DATABASE_URI))

const testDb = async () => {
  const r = await db.raw('SELECT 1+1 AS result')
  return r[0].result
}

module.exports = (req, res) => {
  testDb()
    .then(results => {
      res.end(`Hello from node-knex. Your database is at ${process.env.DATABASE_URI}. The database responded with ${results}.`)
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