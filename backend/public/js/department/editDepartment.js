const deptNameInput = document.querySelector(".department-name")
const assignSupervisor = document.querySelector('.supervisor-menu')
const editDepartmentButton = document.querySelector(".edit-department-button")

editDepartmentButton.addEventListener("click", () => {
    const payload = {
        deptName: deptNameInput.value,
        supervisor: assignSupervisor.options[assignSupervisor.selectedIndex].dataset.id,
        deptId: deptNameInput.dataset.deptid
    }
  
    fetch("/manage/department/update", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
        }

    }).then(res => {
        alert("Department updated")
        window.location.href = "/department"
    })
   
})