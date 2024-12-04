import { useState } from "react"

const Login = () => {
    const [passwordValue, setPasswordValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
  
    const handlePasswordChange = (e) => setPasswordValue(e.target.value)
    const handleUsernameChange = (e) => setUsernameValue(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const payload = {
            username: usernameValue,
            password: passwordValue
        }

        console.log(payload)
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message == "Invalid Credentials") {
                document.getElementById('invalid_credentials').showModal()
            } else {
                const token = res.token
                localStorage.setItem("token", token);
                window.location.href = "/dashboard"
            }
            
        })
    }
   
    return (
        <div className="bg-base-200 min-h-screen flex">
            <div className="bg-red-500 w-full bg-topology bg-cover">

            </div>
            <div className="hero-content w-[1200px] flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <h1 className='text-[40px] font-black text-white text-center'>Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Username" value={usernameValue} onChange={handleUsernameChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder="Password" value={passwordValue} onChange={handlePasswordChange}/>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary mb-2" onClick={handleSubmit}>Login</button>

                        <dialog id="invalid_credentials" className="modal w-screen h-screen">
                            <div className="modal-box border-2 border-error">
                                <h3 className="font-bold text-lg">Invalid Credentials</h3>
                                <p className="py-4">No account found from the given credentials</p>
                                <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-error">Ok</button>
                                </form>
                                </div>
                            </div>
                        </dialog>
                        {/* <button className="btn btn-secondary bg-transparent">Signup</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login
