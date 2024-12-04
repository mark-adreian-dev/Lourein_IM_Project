const { db_mysql_con } = require('../db_connection')


const GetAllProject = async (req, res) => {

    if (req.method == "GET") {
        const query = `SELECT * FROM Project;`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}


const GetProject = async (req, res) => {
    const id = req.params.projId
    if (req.method == "GET") {
        const query = `SELECT * FROM Project WHERE id = ${id};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}

const AddProject = async (req, res) => {
    const projName = req.body.projName
    const startDate = req.body.startDate
    const endDate = req.body.endDate


    const newProject = {
        projName,
        startDate,
        endDate,
    }

    if (req.method == "POST") {
        const query = `INSERT INTO project (name, start_date, end_date) VALUES ('${projName}', '${startDate}', '${endDate}');`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Project is successfully added",
                payload: newProject
            })
        })
    }
}

const DeleteProject = async (req, res) => {
    const projectId = req.params.projId
    if (req.method == "DELETE") {
        const query = `DELETE FROM project WHERE id = ${projectId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Project is successfully removed",
            })
        })
    }
}

const EditProject = async (req, res) => {
    const projectId = req.params.projId
    const projName = req.body.projName
    const startDate = req.body.startDate
    const endDate = req.body.endDate


    if (req.method == "PUT") {
        const query = `UPDATE Project SET name = '${projName}', start_date = '${startDate}', end_date = '${endDate}' WHERE id = ${projectId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Project is successfully updated", 
            })
        })
    }
}


module.exports = {
    GetAllProject,
    GetProject,
    AddProject,
    DeleteProject,
    EditProject
}