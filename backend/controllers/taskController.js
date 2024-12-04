const { db_mysql_con } = require('../db_connection')


const GetAllTask = async (req, res) => {
    const projId = req.params.projId
    if (req.method == "GET") {
        const query = `SELECT * FROM Task WHERE project_id = ${projId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}

const GetTask = async (req, res) => {
    const taskId = req.params.taskId
    if (req.method == "GET") {
        const query = `SELECT * FROM Task WHERE id = ${taskId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send(result)
        })
    }
}

const AddTask = async (req, res) => {
    const projId = req.params.projId
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status

    const newTask = {
        projId,
        title,
        description,
        status,
    }

    if (req.method == "POST") {
        const query = `INSERT INTO task (title, description, status, project_id) VALUES ('${title}', '${description}', '${status}', ${projId})`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Task is successfully added",
                payload: newTask
            })
        })
    }
}

const DeleteTask = async (req, res) => {
    const TaskId = req.params.projId
    if (req.method == "DELETE") {
        const query = `DELETE FROM Task WHERE id = ${TaskId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Task is successfully removed",
            })
        })
    }
}

const EditTask = async (req, res) => {
    const projId = req.params.projId
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status


    if (req.method == "PUT") {
        const query = `UPDATE task SET title = '${title}', description = '${description}', status = '${status}' WHERE id = ${projId};`
        db_mysql_con.query(query, (err, result) => {
            if(err) throw err
            else res.send({
                message: "Task is successfully updated", 
            })
        })
    }
}


module.exports = {
    GetAllTask,
    GetTask,
    AddTask,
    DeleteTask,
    EditTask
}