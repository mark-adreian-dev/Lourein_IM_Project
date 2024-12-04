import { useEffect, useState } from "react"
import DatePicker from "tailwind-datepicker-react"

const EditForm = ({ fields, modal }) => {

    const options = {
		autoHide: true,
		todayBtn: true,
		clearBtn: true,
		inputDateFormatProp: {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		},
		theme: {
			background: "",
			todayBtn: "",
			clearBtn: "",
			icons: "",
			text: "",
			disabledText: "",
			input: "",
			inputIcon: "",
			selected: "",
		},
	}
    const [formData, setFormData] = useState({
        "Project Name": '',
        "startDate": '',
        "endDate": ''
    });
    const [departments, setDepartments] = useState([])
    const [showStart, setShowStart] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
   
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleStartDateChange = (selectedDate) => {

        const date = new Date(selectedDate)

         setFormData((prevData) => ({
          ...prevData,
          startDate: date,
        }));
    }

    const handleEndDateChange = (selectedDate) => {
       
        const date = new Date(selectedDate)
        setFormData((prevData) => ({
            ...prevData,
            endDate: date,
          }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload =  {
            projName: formData["Project Name"],
            startDate: new Intl.DateTimeFormat('en-CA').format(formData.startDate),
            endDate: new Intl.DateTimeFormat('en-CA').format(formData.endDate)
        }

        console.log(payload)

        fetch(`http://localhost:3000/project`, {
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
                "Project Name": '',
                "startDate": '',
                "endDate": ''
            })
    
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
                        <h3 className="font-bold text-lg">Add project</h3>

                        {fields.map(fieldItem => {
                            return <div key={fieldItem}  className="form-control">
                                
                            <label className="label">
                                <span className="label-text">{fieldItem}</span>
                            </label>
                            <input type="text" placeholder={fieldItem} name={fieldItem} className="input input-bordered" value={formData[fieldItem]} onChange={handleOnChange} required />
                        </div>
                        })}

                        <label className="label">
                            <span className="label-text">Start Date</span>
                        </label>







                        <DatePicker show={showStart} setShow={(state) => setShowStart(state)} classNames="" options={options} onChange={handleStartDateChange}/>
                        
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>

                        <DatePicker show={showEnd} setShow={(state) => setShowEnd(state)} classNames="" options={options}  onChange={handleEndDateChange}/>
                        





                        
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
