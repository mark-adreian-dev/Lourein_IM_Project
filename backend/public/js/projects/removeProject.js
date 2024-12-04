const removeButtons = document.querySelectorAll("[data-remove-button]")

removeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const payload = {
            projId:  button.dataset.projid
        }
        
        fetch(`/manage/projects/delete`, {
            method: "DELETE",
            body: JSON.stringify(payload),
            headers: { 
                'Content-type': 'application/json'
              }
        }).then(() => {
    
            alert("Project successfully removed")
            window.location.href = "/project"
       
        })
    })
})