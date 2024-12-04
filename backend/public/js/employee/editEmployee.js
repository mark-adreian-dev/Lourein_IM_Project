const birthMonth = document.querySelector("[data-birth-month]")
const birthDate = document.querySelector("[data-birth-date]")
const birthYear = document.querySelector("[data-birth-year]")

const hiredMonth = document.querySelector("[data-hired-month]")
const hiredDate = document.querySelector("[data-hired-date]")
const hiredYear = document.querySelector("[data-hired-year]")

const firstName = document.querySelector("[data-firstname]")
const lastName = document.querySelector("[data-lastname]")
const position = document.querySelector("[data-position]")
const salary = document.querySelector("[data-salary]")
const updateButton = document.querySelector("[data-update-button]")


const birthday = new Date(birthMonth.dataset.birth_date)
const hiredDay = new Date(hiredMonth.dataset.date_hired)

let birthYearIndex = 0

for(const option of birthYear.options){
    if(Number(option.label) == birthday.getFullYear()) {
        birthYearIndex = option.index
    }
}

birthYear.selectedIndex = birthYearIndex 
birthMonth.selectedIndex = birthday.getMonth() == 0 ? 1 : birthday.getMonth() + 1
birthDate.selectedIndex = birthday.getDate() 


let hiredYearIndex = 0

for(const option of hiredYear.options){
    if(Number(option.label) == hiredDay.getFullYear()) {
        hiredYearIndex = option.index
    }
}


hiredYear.selectedIndex = hiredYearIndex 
hiredMonth.selectedIndex = hiredDay.getMonth() == 0 ? 1 : hiredDay.getMonth() + 1
hiredDate.selectedIndex = hiredDay.getDate() 



updateButton.addEventListener("click", () => {
   
    const payload = {

        firstName : firstName.value,
        lastName : lastName.value,
        salary: salary.value,
        position: position.value,
        birthDate: `${birthYear.value}-${birthMonth.selectedIndex}-${birthDate.options[birthDate.selectedIndex].text}`,
        dateHired: `${hiredYear.value}-${hiredMonth.selectedIndex}-${hiredDate.options[hiredDate.selectedIndex].text}`,
        empId: birthMonth.dataset.empid

    }
       
    fetch("/manage/employee/update", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
        }
        
    }).then(() => {
        
        alert("Employee successfully updated")
        window.location.href = "/employee"

    })

})