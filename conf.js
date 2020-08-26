const mysql = require('mysql')

const dbSetting = typeof process.env.CLEARDB_DATABASE_URL === 'string'
  ? process.env.CLEARDB_DATABASE_URL
  : {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME
  }

  const d = new Date()
  const date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
  console.log("server is up", date)
  
  const connection = mysql.createConnection(dbSetting)

module.exports = connection