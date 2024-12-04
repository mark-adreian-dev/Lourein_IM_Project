const projectName = document.querySelector("[data-projectName]")
const startMonth = document.querySelector("[data-start-month]")
const startDate = document.querySelector("[data-start-date]")
const startYear = document.querySelector("[data-start-year]")

const endMonth = document.querySelector("[data-end-month]")
const endDate = document.querySelector("[data-end-date]")
const endYear = document.querySelector("[data-end-year]")
const editButton = document.querySelector("[data-edit-button]")

const fullStartDate = new Date(startMonth.dataset.fullstartdate)
const fullEndDate = new Date(endMonth.dataset.fullenddate)


let startYearIndex = 0

for(const option of startYear.options){
    if(Number(option.label) == fullStartDate.getFullYear()) {
        startYearIndex = option.index
    }
}


projectName.value = projectName.dataset.projectname
startMonth.selectedIndex = fullStartDate.getMonth() == 0 ? 1 : fullStartDate.getMonth() + 1
startDate.selectedIndex = fullStartDate.getDate()
startYear.selectedIndex = startYearIndex

let endYearIndex = 0

for(const option of endYear.options){
    if(Number(option.label) == fullEndDate.getFullYear()) {
        endYearIndex = option.index
    }
}

console.log(fullEndDate.getFullYear(), fullEndDate.getFullYear())

endMonth.selectedIndex = fullEndDate.getMonth() == 0 ? 1 : fullStartDate.getMonth() + 1
endDate.selectedIndex = fullEndDate.getDate()
endYear.selectedIndex = endYearIndex


editButton.addEventListener("click", () => {
    const payload = {
        projectName: projectName.value,
        startDate: `${startYear.options[startYear.selectedIndex].label}-${startMonth.selectedIndex}-${startDate.selectedIndex}`,
        endDate:`${endYear.options[endYear.selectedIndex].label}-${endMonth.selectedIndex}-${endDate.selectedIndex}`,
        projId: editButton.dataset.projid
    }
    console.log(payload)
    fetch("/manage/projects/update", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
        }
        
 
    }).then(() => {

        alert("Project successfully updated")
        window.location.href = "/project"
   
    })
})





