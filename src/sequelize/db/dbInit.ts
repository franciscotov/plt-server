import { Dialect, Sequelize } from 'sequelize'
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DRIVER } = process.env;

const dbName = DB_NAME as string
const dbUser = DB_USER as string
const dbHost = DB_HOST
const dbDriver = DB_DRIVER as Dialect
const dbPassword = DB_PASSWORD

const seqConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
})

export default seqConnection
