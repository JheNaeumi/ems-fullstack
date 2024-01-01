import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/employeeServices'
import { useNavigate, useParams } from 'react-router-dom'
const EmployeeComponent = () => {
   const [fname, setFirstName] = useState('')
   const [lname, setLastName] = useState('')
   const [email, setEmail] = useState('')

  const [errors, setErrors] =useState( {
    fname: '',
    lname: '',
    email: ''
   })
    const {id} = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.fname);
                setLastName(response.data.lname);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
                            })
        }
    }, [id])
    function handleFirstName(e){
        setFirstName(e.target.value);
    }
    function handlelastName(e){
        setLastName(e.target.value);
    }
    function handleemail(e){
        setEmail(e.target.value);
    }
    function saveorUpdateEmployee(e){
        e.preventDefault();
        
        if(validateForm()){
        
            const employee = {fname, lname, email}

                if(id){
                    updateEmployee(id, employee).then((response)=> {
                        console.log(response.data);
                        navigator('/employees');

                    }).catch(error => {
                        console.error(error);
                    })
                }else{
                console.log(employee);

                    createEmployee(employee).then((response)=> {
                        console.log(response.data);
                        navigator('/employees')
                    }).catch(error => {
                        console.error(error);
                    })
                    }
                }
    }
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}
        
        if(fname.trim()){
            errorsCopy.fname = '';

        }else {
            errorsCopy.fname = 'First name is required';
            valid = false;
        }
        if(lname.trim()){
            errorsCopy.lname ='';

        }
        else{
            errorsCopy.lname = 'Last name is required';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email='';

        }
        else{
            errorsCopy.email = 'Email is required';
            //valid = false;
        }
        setErrors(errorsCopy);

        return valid;
    }
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>

        }
        else{
            return <h2 className='text-center'>Add Employee</h2>

        }
        
    }
  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                        pageTitle()
                }
                <div className='card-body'>
                    <form >
                        <div className='form-group mb-2'>
                          
                            <label className="form-label">First Name</label>
                            <input type="text"
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={fname}
                                    className={`form-control ${errors.fname? 'is-invalid': ''}`}
                                    onChange={handleFirstName}>
                            </input>
                            {errors.fname && <div className='invalid-feedback'>{errors.fname}</div>}
                        </div>
                        <div className='form-group mb-2'>
                          
                            <label className="form-label">Last Name</label>
                            <input type="text"
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lname}
                                    className={`form-control ${errors.lname? 'is-invalid': ''}`}
                                    onChange={handlelastName}>
                            </input>
                            {errors.lname && <div className='invalid-feedback'>{errors.lname}</div>}

                        </div>
                        <div className='form-group mb-2'>
                          
                            <label className="form-label">Email</label>
                            <input type="text"
                                    placeholder='Enter Employee Emai;'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email? 'is-invalid': ''}`}
                                    onChange={handleemail}>
                            </input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                        </div>
                        <button className='btn btn-success' onClick={saveorUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent