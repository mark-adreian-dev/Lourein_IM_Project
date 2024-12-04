const projectName = document.querySelector("[data-project-name]")
const startMonth = document.querySelector("[data-start-month]")
const startDate = document.querySelector("[data-start-date]")
const startYear = document.querySelector("[data-start-year]")

const endMonth = document.querySelector("[data-end-month]")
const endDate = document.querySelector("[data-end-date]")
const endYear = document.querySelector("[data-end-year]")
const addButton = document.querySelector("[data-add-button]")

addButton.addEventListener("click", () => {
    
    const payload = {
        projectName: projectName.value,
        startDate: `${startYear.options[startYear.selectedIndex].label}-${startMonth.selectedIndex}-${startDate.options[startDate.selectedIndex].label}`,
        endDate:  `${endYear.options[endYear.selectedIndex].label}-${endMonth.selectedIndex}-${endDate.options[endDate.selectedIndex].label}`,
    }

    console.log(payload)
    fetch("/manage/projects/add", {

        method: "POST",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
          }
    }).then(() => {

        alert("Project successfully added")
        window.location.href = "/project"
   
    })
})