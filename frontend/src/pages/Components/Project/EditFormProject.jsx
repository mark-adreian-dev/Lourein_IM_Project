import { useEffect, useState } from "react"
import DatePicker from "tailwind-datepicker-react"

const EditForm = ({ id, fields, formCategory, modal}) => {
    const [formData, setFormData] = useState({
        "Project Name": '',
        "startDate": '',
        "endDate": ''
    });

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

    const [showStart, setShowStart] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
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
            projName: formData["Project Name"],
            startDate: new Intl.DateTimeFormat('en-CA').format(formData.startDate),
            endDate: new Intl.DateTimeFormat('en-CA').format(formData.endDate)
        }

        console.log(payload)


        fetch(`http://localhost:3000/project/${id}`, {
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
              
                setFormData({
                    "Project Name": res[0].name,
                    "startDate": new Date(res[0].start_date),
                    "endDate": new Date(res[0].end_date)
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
                            <span className="label-text">Start Date</span>
                        </label>                     
                       
                        <DatePicker value={formData.startDate} show={showStart} setShow={(state) => setShowStart(state)} classNames="" options={options} onChange={handleStartDateChange}/>
                        
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>

                        <DatePicker value={formData.endDate}  show={showEnd} setShow={(state) => setShowEnd(state)} classNames="" options={options}  onChange={handleEndDateChange}/>
                        

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
