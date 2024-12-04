
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
const addButton = document.querySelector("[data-add-button]")


const birthday = new Date(birthMonth.dataset.birth_date)
const hiredDay = new Date(hiredMonth.dataset.date_hired)


addButton.addEventListener("click", () => {
    
    const payload = {

        firstName : firstName.value,
        lastName : lastName.value,
        salary: salary.value,
        position: position.value,
        birthdate: `${birthYear.value}-${birthMonth.selectedIndex}-${birthDate.options[birthDate.selectedIndex].text}`,
        dateHired: `${hiredYear.value}-${hiredMonth.selectedIndex}-${hiredDate.options[hiredDate.selectedIndex].text}`,

    }

    console.log(payload)

    fetch("/manage/employee/add", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 
            'Content-type': 'application/json'
          }
        
 
    }).then(() => {

        alert("Employee successfully added")
        window.location.href = "/employee"
   
    })
})