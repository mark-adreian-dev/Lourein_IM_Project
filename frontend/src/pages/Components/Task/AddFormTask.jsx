import { useEffect, useState } from "react"

const EditForm = ({ fields, modal, id, reload, setReload}) => {

    const [formData, setFormData] = useState({
        "Task Name": '',
        "Description": '',
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
            id: id,
            title: formData["Task Name"],
            description: formData.Description,
            status: "Pending"
        }

        console.log(payload)

        fetch(`http://localhost:3000/task/${id}`, {
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
                "Task Name": '',
                "Description": '',
            })

            setReload(!reload)
    
            document.getElementById(modal).close()
        })    
    }

    useEffect(() => {
        fetch("http://localhost:3000/task/" + id, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
        
            if(res.message == "Invalid token") window.location.href = "/"
        })

    },[reload, id])

    
    
 
    return (
        <dialog id={modal} className="modal">
            <div className="modal-box border-2 border-red-900">   
                <div className="modal-action">

                    <div className="card-body ">
                        <h3 className="font-bold text-lg">Add project</h3>

                        {fields.map(fieldItem => {
                            return <div key={fieldItem}  className="form-control">
                                
                            <label className="label">
                                <span className="label-text">{fieldItem}</span>
                            </label>
                            <input type="text" placeholder={fieldItem} name={fieldItem} className="input input-bordered" value={formData[fieldItem]} onChange={handleOnChange} required />
                        </div>
                        })}
                        
                        <div className="form-control mt-6">
                            <button className="btn btn-primary mb-2" onClick={handleSubmit}>Add project</button>                       
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
