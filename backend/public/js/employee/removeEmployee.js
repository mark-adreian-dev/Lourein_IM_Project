const removeEmployeeButtons = document.querySelectorAll(".employee-remove")

removeEmployeeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const employeId = button.dataset.id
        
        fetch(`/manage/employee/delete/${employeId}`, {
            method: "DELETE"
        }).then(res => {
            alert("Employee Removed")
            window.location.href = "/employee"
        }).catch (err => {
            console.log(err)
        })
    })
})


