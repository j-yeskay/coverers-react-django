import React, { useState } from 'react';
import axiosInstance from '../axios';
import { Link, useNavigate } from 'react-router-dom';



export default function Login(){
    const history = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password:'',
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
            .post(`token/`, {
                email : formData.email,
                password : formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                history('/home');

            })
            .catch((error) => {
                // console.log(error.response.data);
                const error_box = document.getElementById("error_box");
                const message = 'Email or Password is Wrong!';
                error_box.innerHTML += `<div class="alert alert-warning" role="alert"> ${message} </div>`
                   
                history('/login');
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
                <h1>Login Now on <Link to="/" className="text text-danger"> Coverers </Link></h1>
                <hr/>
                <div className="card" style={{width:'500px'}}>
                    <form method = "post" className = "form-group" onSubmit = {handleSubmit}>
                        <input type="email" name="email" className="form-control" placeholder="Email"  required style={{marginBottom:'5px'}} onChange={handleChange}/>
                        <input type="password" name="password" className="form-control" placeholder="Password"  required  style={{marginBottom:'5px'}} onChange={handleChange}/> 
                        <button className="btn btn-danger" style={{marginBottom:'5px', 'marginTop':'5px'}} >Login</button>
                    </form>
                    <span> Don't Have a <b><u className = "text text-danger"> Coverers</u></b> account? </span> <Link to="/register" style={{marginBottom:'5px'}}>Register now</Link>
                </div>
            </center>
        </div>
    );
}