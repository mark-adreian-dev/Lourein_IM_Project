const { db_mysql_con } = require('./db_connection')

//Dependencies
const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");

//Routes
const DepartmentRoutes = require('./route/DepartmentRoutes')
const EmployeeRoutes = require('./route/EmployeeRoutes')
const ProjectRoutes = require('./route/ProjectRoutes')
const TaskRoutes = require('./route/TaskRoutes')


//Express Setup
const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Configuring ports
const PORT = process.env.PORT || 3000

const SECRET_KEY = "your_secret_key";


//Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    
    const query = `SELECT * FROM account WHERE username = '${username}' AND password = '${password}'`
    
    db_mysql_con.query(query, (err, result) => {
        if(err) throw err
        else {

            const user = result[0]
            if(user) {
                const token = jwt.sign({ id: user.acc_id }, SECRET_KEY, { expiresIn: "1h" });
                res.json({ token });
            } else {
                return res.send({message: "Invalid Credentials"})
            }
           
        }
    })

  

    // const user = users.find((u) => u.username === username);
    // if (!user) 

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    
});




//Top level routing system
app.use("/department", DepartmentRoutes)
app.use("/employee", EmployeeRoutes)
app.use("/project", ProjectRoutes)
app.use("/task", TaskRoutes)

//Running Server
app.listen(PORT, (err) => {
    if(err) console.log(err)
    else console.log(`The server is running on PORT:${PORT}`)
})

