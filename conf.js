const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME
})

const d = new Date()
const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
console.log("server is up", date)

module.exports = connection