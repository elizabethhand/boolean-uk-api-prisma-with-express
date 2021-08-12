const clientDb = require("pg")
const env = require("dotenv")

env.config()

const client = new clientDb.Client(process.env.PGURL)

module.exports = client