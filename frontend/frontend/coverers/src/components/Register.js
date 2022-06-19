import React, { useState } from 'react';
import axiosInstance from '../axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Register(){
    const history = useNavigate();
    const initialFormData = Object.freeze({
        username: '',
        email: '',
        first_name: '',
        last_name:'',
        password:'',
        password2:'',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`user/register/`, {
                username : formData.username,
                email : formData.email,
                first_name : formData.first_name,
                last_name : formData.last_name,
                password : formData.password,
                password2 : formData.password2
            })
            .then((res) => {
                history('/login');
            })
            .catch((error) => {
                const error_box = document.getElementById("error_box");
                // console.log(error.response.data);
                for (const item in error.response.data){
                    let message = '';
                    if(item == 'username'){
                        message = "That Username is Already Taken!"
                        error_box.innerHTML += `<div class="alert alert-warning" role="alert"> ${message} </div>`

                    }
                    if(item == 'email'){
                        message = "That Email is Already Taken!"
                        error_box.innerHTML += `<div class="alert alert-warning" role="alert"> ${message} </div>`

                    }
                    
                    if(item == 'password2'){
                        message = "Passwords Don't Match!"
                        error_box.innerHTML += `<div class="alert alert-warning" role="alert"> ${message} </div>`

                    }

                    if(item == 'password'){
                        message = error.response.data[item];
                        error_box.innerHTML += `<div class="alert alert-warning" role="alert"> ${message} </div>`

                    }
                    
                }
                history('/register');
            })
            
            
    }
    return (
        <div>
            <center>
            <div id = "error_box" style={{width:'500px'}}>

            </div>
            </center>
            <br/><br/>
            <center>
                <h1>Register Now on <Link to="/" className="text text-danger"> Coverers </Link></h1>
                <hr/>
                <div className="card" style={{width:'500px'}}>
                    <form method = "post" className = "form-group" onSubmit = {handleSubmit}>
                        <input type="text" name="username" className="form-control" placeholder="Username"  maxLength="255" autoFocus required style={{marginBottom:'5px'}} onChange={handleChange}/>
                        <input type="text" name="first_name" className="form-control" placeholder="First Name" required  style={{marginBottom:'5px'}} onChange={handleChange}/>
                        <input type="text" name="last_name" className="form-control" placeholder="Last Name" required  style={{marginBottom:'5px'}} onChange={handleChange}/>
                        <input type="email" name="email" className="form-control" placeholder="Email"  required style={{marginBottom:'5px'}} onChange={handleChange}/>
                        <input type="password" name="password" className="form-control" placeholder="Password"  required  style={{marginBottom:'5px'}} onChange={handleChange}/> 
                        <input type="password" name="password2" className="form-control" placeholder="Password Confirmation"  required  styles={{marginBottom:'5px'}} onChange={handleChange}/>
                        <button className="btn btn-danger" style={{marginBottom:'5px', 'marginTop':'5px'}} >Register</button>
                    </form>
                    <span> Already Have a <b><u className = "text text-danger"> Coverers</u></b> account? </span> <Link to ="/login" style={{marginBottom:'5px'}}>Login now</Link>
                </div>
            </center>
        </div>
    );
}