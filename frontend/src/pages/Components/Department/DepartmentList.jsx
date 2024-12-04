import { useEffect, useState } from "react"
const DepartmentList = ({ setTargetEdit, addModal, editModal }) => {
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/department", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
        
            if(res.message == "Invalid token") window.location.href = "/"
            else setDepartments(res)
            
        })

    }, [departments])
    const handleEditClick = (id) => {
        document.getElementById(editModal).showModal()
        setTargetEdit(id)
    }

    const handleAddClick = () => {
        document.getElementById(addModal).showModal()
   
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/department/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => alert(res.message))
    }

    if(departments.length == 0) return  <div className="w-full h-[calc(100%-132px)] text-center flex justify-center items-center">Loading...</div>
    
    return (
        <>  
            <div className="w-full flex justify-between items-center py-10">
                    <h1 className="text-[40px] font-bold">Departments</h1>
                    <button className="btn bg-emerald-600" onClick={handleAddClick}>Add Department</button>
            </div>
            <div className="grid grid-cols-4 gap-4 pb-20">
                {departments.map(department => { 
                    return <div key={department.id} className="card bg-base-100 w-full border-red-900 border-2 shadow-xl">
                    <div className="card-body">
                    <h2 className="card-title">{department.name}</h2>
                    <p>{department.location}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleEditClick(department.id)}>Edit</button>
                        <button className="btn btn-error" onClick={() => handleDelete(department.id)}>Remove</button>
                    </div>
                    </div>
                </div>
                })}
            </div>
        </>
       
  )
}

export default DepartmentList
