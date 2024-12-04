import { useState } from "react"

const EditForm = ({ fields, modal }) => {

    const [formData, setFormData] = useState({
        "Department Name": '',
        "Location": '',
    });
   
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
            deptName: formData["Department Name"],
            deptLoc: formData.Location
        }

        console.log(payload)

        fetch(`http://localhost:3000/department`, {
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
                "Department Name": '',
                "Location": '',
            })
            document.getElementById(modal).close()
        })    
    }

    
    
 
    return (
        <dialog id={modal} className="modal">
            <div className="modal-box border-2 border-red-900">   
                <div className="modal-action">

                    <div className="card-body ">
                        <h3 className="font-bold text-lg">Add Department</h3>

                        {fields.map(fieldItem => {
                            return <div key={fieldItem}  className="form-control">
                                
                            <label className="label">
                                <span className="label-text">{fieldItem}</span>
                            </label>
                            <input type="text" placeholder={fieldItem} name={fieldItem} className="input input-bordered" value={formData[fieldItem]} onChange={handleOnChange} required />
                        </div>
                        })}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary mb-2" onClick={handleSubmit}>Add Department</button>                       
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
