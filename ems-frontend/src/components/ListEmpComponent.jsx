import React, {useEffect, useState}from 'react'
import { deleteEmployee, listEmployees } from '../services/employeeServices'
import { useNavigate } from 'react-router-dom'
const ListEmpComponent = () => {
    const dummyData =[
        {
            "id": 1,
            "firstName":"Ramesh",
            "lastName" : "Fadatare",
            "email" :"ramesh@gmail.com"
        }
    ]
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getallEmployees();
    }, [])
    function getallEmployees(){
        listEmployees().then((response) =>{setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response)=>{
            getallEmployees();
        }).catch(error => {
            console.error(error);
        })
    }
    return (
    <div className='container'>
        <h2>List of Employees</h2>
        <button className='btn btn-primary mb-2'onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Emplotee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.fname}</td>
                            <td>{employee.lname}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info'onClick={() => updateEmployee(employee.id)}>Update</button>
                            </td>
                            <td>
                                <button className='btn btn-danger'onClick={()=> removeEmployee(employee.id)} >Delete</button>
                            </td>
                        </tr>)
                }
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
   
  )
}

export default ListEmpComponent