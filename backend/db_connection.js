require('dotenv').config()
const mysql = require("mysql2")

const dbPassword = process.env.DATABASE_PASSWORD

//Database Connection (MySql)
const db_mysql_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: dbPassword,
    database: "im_project_abanales"
})

db_mysql_con.connect(err => err ? console.log(err) : console.log("Database Connected"))

module.exports = {
    db_mysql_con
}