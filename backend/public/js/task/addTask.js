const taskDesc = document.querySelector("[data-task-desc]")
const endMonth = document.querySelector("[data-end-month]")
const endDate = document.querySelector("[data-end-date]")
const endYear = document.querySelector("[data-end-year]")
const addButton = document.querySelector("[data-btn-add]")


addButton.addEventListener("click", () => {
    const year = endYear.options[endYear.selectedIndex].label
    const month = endMonth.selectedIndex
    const date = endDate.options[endDate.selectedIndex].label


    const payload = {
        taskDesc: taskDesc.value,
        endDate: `${year}-${month}-${date}`,
        projId: addButton.dataset.projid
    }

    console.log(payload)

    fetch("/manage/task/add", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
        }
    }) .then (res => {
       
       
            alert("Task added successfully")
            window.location.href = `/task/${addButton.dataset.projid}`
        
    })
})