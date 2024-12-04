import { useState } from "react"
import Navbar from "./Components/Navbar"
import EditForm from "./Components/Department/EditFormDepartment"
import EditFormEmployee from "./Components/Employee/EditFormEmployee"
import AddForm from "./Components/Department/AddFormDepartment"
import AddFormEmployee from "./Components/Employee/AddFormEmployee"
import DepartmentList from "./Components/Department/DepartmentList"
import EmployeeList from "./Components/Employee/EmployeeList"
import ProjectList from "./Components/Project/ProjectList"
import AddFormProject from "./Components/Project/AddFormProject"
import EditFormProject from "./Components/Project/EditFormProject"
import TaskList from './Components/Task/TaskList'
import AddFormTask from './Components/Task/AddFormTask'
import EditFormTask from './Components/Task/EditFormTask'

const Dashboard = () => {
    
    const [active, setActive] = useState("Department")
    const [targetDepartmentEdit, setTargetDepartmentEdit] = useState(null)
    const [targetEmployeeEdit, setTargetEmployeeEdit] = useState(null)
    const [targetProjectEdit, setTargetProjectEdit] = useState(null)

    const [targetTaskEdit, setTargetTaskEdit] = useState(null)
    const [activeProjectTask, setActiveProjectTask] = useState(null)
    const [reload, setReload] = useState(false);

    console.log(activeProjectTask)
    return (
        <div className="px-20 h-screen relative">
            <Navbar active={active} setActive={setActive}/>
            {active == "Department" ? 
                <DepartmentList editModal="edit_form_department" addModal="add_form_department" setTargetEdit={setTargetDepartmentEdit} /> :
             active ==  "Employee" ?
                <EmployeeList editModal="edit_form_employee" addModal="add_form_employee" setTargetEmployeeEdit={setTargetEmployeeEdit}/> :
             active == "Project" ?
                <ProjectList editModal="edit_form_project" addModal="add_form_project" setTargetProjectEdit={setTargetProjectEdit} setActive={setActive} setActiveProjectTask={setActiveProjectTask}/> : 
             active == "Task" ?
                <TaskList reload={reload} setReload={setReload} projId={activeProjectTask} editModal="edit_form_task" addModal="add_form_task" setTargetTaskEdit={setTargetTaskEdit} /> :
                <>No Item</>}
            
            {/* Department */}
            <EditForm modal="edit_form_department" id={targetDepartmentEdit} formCategory="department" fields={["Department Name", "Location"]}/>
            <AddForm modal="add_form_department" formCategory="department" fields={["Department Name", "Location"]}/>
            
            {/* Employee */}
            <EditFormEmployee modal="edit_form_employee" id={targetEmployeeEdit} formCategory="employee" fields={["first_name", "last_name", "email"]}/>
            <AddFormEmployee modal="add_form_employee" formCategory="employee" fields={["first_name", "last_name", "email"]}/>
                
            {/* Project */}
            <AddFormProject  modal="add_form_project" formCategory="project" fields={["Project Name"]}/>
            <EditFormProject modal="edit_form_project" id={targetProjectEdit} formCategory="project" fields={["Project Name"]} />

            {/* Task */}
            <AddFormTask   id={activeProjectTask} reload={reload} setReload={setReload} modal="add_form_task" formCategory="task" fields={["Task Name", "Description"]}/>
            <EditFormTask reload={reload} setReload={setReload} modal="edit_form_task" id={targetTaskEdit} formCategory="task" fields={["Task Name", "Description"]} />
        </div>
    )
}

export default Dashboard
