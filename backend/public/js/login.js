const loginBtn = document.querySelector('.login-btn')
const username = document.querySelector(".username")
const password = document.querySelector(".password")

loginBtn.addEventListener("click", (e) => {
    if(username.value != "" && password.value != "") {
        e.preventDefault()
        const payload = {
            username: username.value,
            password: password.value
        }

        fetch("/manage/account/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { 
                'Content-type': 'application/json'
            }
        }) .then (res => res.json())
        .then(res => {

            if(res.isAllowed){
                window.location.href = `/department`
            }else {
                alert(res.message)
            }
           
        })
    }
})