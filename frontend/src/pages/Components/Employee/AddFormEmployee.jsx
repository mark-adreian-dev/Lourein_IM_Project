import { useEffect, useState } from "react"

const EditForm = ({ fields, modal }) => {

    const [formData, setFormData] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "department": ''
    });
    const [departments, setDepartments] = useState([])
    const [selectedOption, setSelectedOption] = useState(0);
   
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
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

        fetch(`http://localhost:3000/employee`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => alert(res.message))
        .then(() => {
            setFormData({
                "first_name": '',
                "last_name": '',
                "email": '',
                "department": ''
            })
            setSelectedOption(0)
            document.getElementById(modal).close()
        })    
    }

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

    },[departments])

    
    
 
    return (
        <dialog id={modal} className="modal">
            <div className="modal-box border-2 border-red-900">   
                <div className="modal-action">

                    <div className="card-body ">
                        <h3 className="font-bold text-lg">Add Employee</h3>

                        {fields.map(fieldItem => {
                            return <div key={fieldItem}  className="form-control">
                                
                            <label className="label">
                                <span className="label-text">{fieldItem}</span>
                            </label>
                            <input type="text" placeholder={fieldItem} name={fieldItem} className="input input-bordered" value={formData[fieldItem]} onChange={handleOnChange} required />
                        </div>
                        })}

                        <label className="label">
                            <span className="label-text">Department</span>
                        </label>
                        <select defaultValue={'DEFAULT'} onChange={e => setSelectedOption(e.target.value)} className="select select-bordered w-full">
                            <option disabled value="DEFAULT">Department</option>
                            {departments.map(dept => {
                                return <option name="department" value={dept.id} key={dept.id} >{dept.name}</option>
                            })}
                        </select>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary mb-2" onClick={handleSubmit}>Add Employee</button>                       
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
