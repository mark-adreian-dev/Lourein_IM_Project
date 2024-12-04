const { db_mysql_con } = require('../db_connection')

const GetAllDepartment = async (req, res) => {

    if (req.method == "GET") {
        const query = `SELECT * FROM department;`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}


const GetDepartment = async (req, res) => {
    const deptId = req.params.deptId
    if (req.method == "GET") {
        const query = `SELECT * FROM department WHERE id = ${deptId}`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}

const AddDepartment = async (req, res) => {
    const deptName = req.body.deptName
    const deptLoc = req.body.deptLoc

    const newDepartment = {
        deptName,
        deptLoc
    }

    if (req.method == "POST") {
        const query = `INSERT INTO Department (name, location) VALUES ('${deptName}', '${deptLoc}');`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Department is successfully added",
                payload: newDepartment
            })
        })
    }
}

const DeleteDepartment = async (req, res) => {
    const deptId = req.params.deptId
    if (req.method == "DELETE") {
        const query = `DELETE FROM department WHERE id = ${deptId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Department is successfully removed",
            })
        })
    }
}

const EditDepartment = async (req, res) => {
    const deptId = req.params.deptId
    const deptName = req.body.deptName
    const deptLoc = req.body.deptLoc

    console.log(deptId, deptName, deptLoc)
  
    if (req.method == "PUT") {
        const query = `UPDATE department SET name = '${deptName}', location = '${deptLoc}' WHERE id = ${deptId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Department is successfully updated", 
            })
        })
    }
}


module.exports = {
    GetAllDepartment,
    GetDepartment,
    AddDepartment,
    DeleteDepartment,
    EditDepartment
}