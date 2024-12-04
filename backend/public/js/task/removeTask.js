const deleteButtons = document.querySelectorAll('[data-deletebtn]') 

deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
        const payload = {
            taskId : button.dataset.deletebtn
        }
        console.log(payload)
        fetch(`/manage/task/delete/${payload.taskId}`, {
            method: "DELETE",
            body: JSON.stringify(payload),
            headers: { 
                'Content-type': 'application/json'
            }
        }).then (res => {
           
                console.log("before rerendering")
                alert("Task removed successfully")
                window.location.href = `/task/${button.dataset.proj}`
            
        })
        
    })
})