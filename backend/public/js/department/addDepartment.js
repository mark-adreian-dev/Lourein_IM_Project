const deptNameInput = document.querySelector(".department-name")
const supervisorInput = document.querySelector(".supervisor-menu")
const addDeptButton = document.querySelector('.add-department-button')

const date = new Date()



addDeptButton.addEventListener("click", () => {

    const payload = {
        dept_name: deptNameInput.value,
        dept_supervisor: supervisorInput.value === "Employee" ? "NULL" : supervisorInput.options[supervisorInput.selectedIndex].id,
        date_est: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }

    fetch("/manage/department/add", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
        }
    }).then(res => {
       
        alert("Department successfully added")
        window.location.href = "/department"
    })
    
})