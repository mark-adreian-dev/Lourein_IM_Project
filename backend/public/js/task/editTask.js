const taskDesc = document.querySelector("[data-task-desc]")
const endMonth = document.querySelector("[data-end-month]")
const endDate = document.querySelector("[data-end-date]")
const endYear = document.querySelector("[data-end-year]")
const editButton = document.querySelector("[data-btn-edit]")
const data = document.querySelector("[data-fulldate]")

const endDay = new Date(data.dataset.fulldate)

let endYearIndex = 0

for(const option of endYear.options){
    if(Number(option.label) == endDay.getFullYear()) {
        endYearIndex = option.index
    }
}
endYear.selectedIndex = endYearIndex
endMonth.selectedIndex = endDay.getMonth() == 0 ? 1 : endDay.getMonth() + 1
endDate.selectedIndex = endDay.getDate() 

editButton.addEventListener("click", () => {
    const payload = {
        taskDesc: taskDesc.value,
        endDate : `${endYear.options[endYear.selectedIndex].label}-${endMonth.selectedIndex}-${endDate.options[endDate.selectedIndex].label}`,
        taskId: Number(data.dataset.taskid)
    }
    
    fetch("/manage/task/update", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
        }
    }) .then (res => {
       
       
            alert("Task updated successfully")
            window.location.href = `/task/${Number(data.dataset.projid)}`
        
    })
})