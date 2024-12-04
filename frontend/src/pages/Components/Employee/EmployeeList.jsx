import { useEffect, useState } from "react"
const EmployeeList = ({ setTargetEmployeeEdit, addModal, editModal }) => {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/employee", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            
            if(res.message == "Invalid token") window.location.href = "/"
            else setEmployees(res)
            
        })

    }, [employees])
    const handleEditClick = (id) => {
        document.getElementById(editModal).showModal()
        setTargetEmployeeEdit(id)
    }

    const handleAddClick = () => {
        document.getElementById(addModal).showModal()
   
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/employee/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => alert(res.message))
    }

    if(employees.length == 0) return  <div className="w-full h-[calc(100%-132px)] text-center flex justify-center items-center">Loading...</div>
    
    return (
        <>  
            <div className="w-full flex justify-between items-center py-10">
                    <h1 className="text-[40px] font-bold">Employees</h1>
                    <button className="btn bg-emerald-600" onClick={handleAddClick}>Add Employee</button>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-20">
                {employees.map(Employee => { 
                    return <div key={Employee.email} className="card bg-base-100 w-full border-red-900 border-2 shadow-xl">
                    <div className="card-body">
                        
                    <h2 className="card-title">{Employee.first_name} {Employee.last_name}</h2>
                    <p className="mb-5">{Employee.name}</p>
                    <p>{Employee.email}</p> 
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleEditClick(Employee.id)}>Edit</button>
                        <button className="btn btn-error" onClick={() => handleDelete(Employee.id)}>Remove</button>
                    </div>
                    </div>
                </div>
                })}
            </div>
        </>
       
  )
}

export default EmployeeList
