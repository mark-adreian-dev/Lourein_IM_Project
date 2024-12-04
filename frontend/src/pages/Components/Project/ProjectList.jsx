import { useEffect, useState } from "react"
const ProjectList = ({ setTargetProjectEdit, addModal, editModal, setActiveProjectTask, setActive }) => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/project", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            
            if(res.message == "Invalid token") window.location.href = "/"
            else setProjects(res)
            
        })

    }, [projects])
    const handleEditClick = (id) => {
        document.getElementById(editModal).showModal()
        setTargetProjectEdit(id)
    }

    const handleAddClick = () => {
        document.getElementById(addModal).showModal()
   
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/project/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => alert(res.message))
    }

    if(projects.length == 0) return  <div className="w-full h-[calc(100%-132px)] text-center flex justify-center items-center">Loading...</div>
    
    return (
        <>  
            <div className="w-full flex justify-between items-center py-10">
                    <h1 className="text-[40px] font-bold">Projects</h1>
                    <button className="btn bg-emerald-600" onClick={handleAddClick}>Add Project</button>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-20">
                {projects.map(project => { 
                    const startDate = new Date(project.start_date)
                    const endDate = new Date(project.end_date)

                    const diffInMs = endDate - startDate;
                    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

                    return <div key={project.id} className="card bg-base-100 w-full border-red-900 border-2 shadow-xl">
                    <div className="card-body">
                        
                    <h2 className="card-title mb-5">{project.name}</h2>
                    
                    <div className="badge badge-warning gap-2 mb-5 font-bold">
                   
                    {diffInDays} days left
                    </div>

                  
                   
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleEditClick(project.id)}>Edit</button>
                        <button className="btn btn-error" onClick={() => handleDelete(project.id)}>Remove</button>
                        <button className="btn bg-emerald-800" onClick={() => {setActiveProjectTask(project.id); setActive("Task")}}>View Tasks</button>
                        
                    </div>
                    </div>
                </div>
                })}
            </div>
        </>
       
  )
}

export default ProjectList
