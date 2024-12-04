import { useEffect, useState } from "react"

const EditForm = ({ id, fields, formCategory, modal}) => {
    const [formData, setFormData] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "department": ''
    });
    const [selectedOption, setSelectedOption] = useState(0);
    const [departments, setDepartments] = useState([])
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload =  {
            firstname: formData.first_name,
            lastname: formData.last_name,
            email: formData.email,
            deptId: selectedOption,

        }


        console.log(payload)

        fetch(`http://localhost:3000/employee/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => alert(res.message))
        .then(() => document.getElementById(modal).close())    
    }

    useEffect(() => {
        if(id != null) {
            
            fetch(`http://localhost:3000/${formCategory}/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res[0].first_name)
                console.log(res[0].last_name)
                console.log(res[0].email)
                console.log(res[0].id)
        
                setFormData({
                    "first_name": res[0].first_name,
                    "last_name": res[0].last_name,
                    "email": res[0].email,
                    "department": res[0].id
                })
               
                setSelectedOption(res[0].department_id)

            }) .then(() => {
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
            })
        }

        

    }, [id, formCategory])
    
    return (
        <dialog id={modal} className="modal">
            <div className="modal-box border-2 border-red-900">   
                <div className="modal-action">

                    <div className="card-body ">
                        <h3 className="font-bold text-lg">Edit Employee</h3>

                        {fields.map(fieldItem => {
                            return <div key={fieldItem} className="form-control">
                                
                            <label className="label">
                                <span className="label-text">{fieldItem}</span>
                            </label>
                            <input type="text" placeholder={fieldItem} name={fieldItem} className="input input-bordered" value={formData[fieldItem]} onChange={handleOnChange} required />
                        </div>
                        })}

                        <label className="label">
                            <span className="label-text">Department {selectedOption}</span>
                        </label>
                        <select defaultValue={selectedOption} onChange={e => setSelectedOption(e.target.value)} className="select select-bordered w-full">
                            <option disabled value={"Default"}>Department</option>
                            {departments.map(dept => {
                                return dept.id == selectedOption ? <option name="department" selected value={dept.id} key={dept.id} >{dept.name}</option> :<option name="department" value={dept.id} key={dept.id} >{dept.name}</option>
                            })}
                        </select>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary mb-2" onClick={handleSubmit}>Update</button>                       
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-error w-full">Close</button>
                            </form>     
                        </div>
                    </div>           
                </div>
            </div>
        </dialog>
    )
}

export default EditForm
