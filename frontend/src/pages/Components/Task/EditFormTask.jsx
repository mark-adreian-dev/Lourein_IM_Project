import { useEffect, useState } from "react"

const EditForm = ({ id, fields, formCategory, modal, setReload, reload}) => {
    const status = ['Status','Pending', 'In Progress', 'Completed']
    const [formData, setFormData] = useState({
        "Task Name": '',
        "Description": '',
        "Status": ''
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
            title: formData["Task Name"],
            description: formData.Description,
            status: formData.Status
        }

        console.log(payload)


        fetch(`http://localhost:3000/task/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            alert(res.message)
            setReload(!reload)
        })
        .then(() => document.getElementById(modal).close()) 
    }

    useEffect(() => {
        if(id != null) {
            fetch(`http://localhost:3000/${formCategory}/${id}/item`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log("Response: " + res)
                console.log(res)
                setFormData({
                    "Task Name": res[0].title,
                    "Description": res[0].description,
                    "Status": res[0].status
                })
            })
        }
             
           

    
    }, [id, formCategory])

    return (
        <dialog id={modal} className="modal">
            <div className="modal-box border-2 border-red-900">   
                <div className="modal-action">

                    <div className="card-body ">
                        <h3 className="font-bold text-lg">Edit project</h3>

                        {fields.map(fieldItem => {
                            return <div key={fieldItem} className="form-control">
                                
                            <label className="label">
                                <span className="label-text">{fieldItem}</span>
                            </label>
                            <input type="text" placeholder={fieldItem} name={fieldItem} className="input input-bordered" value={formData[fieldItem]} onChange={handleOnChange} required />
                        </div>
                        })}

                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>

                        <select value={formData.Status} name="Status" onChange={handleOnChange} className="select select-bordered w-full">
                            
                        {
                            status.map((item) => {    
                                if(item == "Status") return  <option disabled value={item} key={item}>{item}</option>
                                return <option value={item} key={item}>{item}</option>
                            })
                        }
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
