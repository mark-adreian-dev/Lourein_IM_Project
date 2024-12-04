import { useEffect, useState } from "react"
const TaskList = ({ setTargetTaskEdit, addModal, editModal, projId, reload, setReload }) => {
    const [Tasks, setTasks] = useState([])
    useEffect(() => {
        
        fetch(`http://localhost:3000/task/${projId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            
            if(res.message == "Invalid token") window.location.href = "/"
            else setTasks(res)
            
        }) 

    }, [projId, reload])
    const handleEditClick = (id) => {
        document.getElementById(editModal).showModal()
        setTargetTaskEdit(id)
    }

    const handleAddClick = () => {
        document.getElementById(addModal).showModal()
   
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/task/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {alert(res.message)
            setReload(!reload)
        })
    }

    
    return (
        <>  
       
            <div className="w-full flex justify-between items-center py-10">
                    <h1 className="text-[40px] font-bold">Tasks</h1>
                    <button className="btn bg-emerald-600" onClick={handleAddClick}>Add Task</button>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-20">
                {TaskList.length > 0 && Tasks.map(Task => { 
                   

                    return <div key={Task.id} className="card bg-base-100 w-full border-red-900 border-2 shadow-xl">
                    <div className="card-body">
                        
                    <h2 className="card-title mb-5">{Task.title}</h2>
                    <p className="card-title mb-5">{Task.description}</p>
                    
                    <div className="badge badge-warning gap-2 mb-5 font-bold">
                   
                        {Task.status}
                    </div>

                  
                   
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleEditClick(Task.id)}>Edit</button>
                        <button className="btn btn-error" onClick={() => handleDelete(Task.id)}>Remove</button>
                    </div>
                    </div>
                </div>
                })}
            </div>  
            
           
        </>
       
  )
}

export default TaskList
