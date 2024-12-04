const { db_mysql_con } = require('../db_connection')


const GetAllEmployee = async (req, res) => {

    if (req.method == "GET") {
        const query = `SELECT employee.id, employee.department_id, employee.first_name, employee.last_name, employee.email, department.name FROM employee LEFT JOIN department ON employee.department_id = department.id;`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}

const GetEmployee = async (req, res) => {
    const id = req.params.employeeId
    if (req.method == "GET") {
        const query = `SELECT * FROM employee WHERE id = ${id}`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}


const AddEmployee = async (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const departmentId = req.body.deptId

    const newEmployee = {
        firstname,
        lastname,
        email,
        departmentId
    }

    if (req.method == "POST") {
        const query = `INSERT INTO employee (first_name, last_name, email, department_id) VALUES ('${firstname}', '${lastname}', '${email}', ${departmentId})`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Employee is successfully added",
                payload: newEmployee
            })
        })
    }
}

const DeleteEmployee = async (req, res) => {
    const employeeId = req.params.employeeId
    if (req.method == "DELETE") {
        const query = `DELETE FROM employee WHERE id = ${employeeId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Employee is successfully removed",
            })
        })
    }
}

const EditEmployee = async (req, res) => {
    const employeeId = req.params.employeeId
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const departmentId = req.body.deptId

  
    if (req.method == "PUT") {
        const query = `UPDATE employee SET first_name = '${firstname}', last_name = '${lastname}', email = '${email}', department_id = ${departmentId} WHERE id = ${employeeId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Department is successfully updated", 
            })
        })
    }
}


module.exports = {
    GetAllEmployee,
    GetEmployee,
    AddEmployee,
    DeleteEmployee,
    EditEmployee
}