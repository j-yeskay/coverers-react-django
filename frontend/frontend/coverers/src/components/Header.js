import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../axios";


function Header() {
  const history = useNavigate();
  
  const initialFormData = Object.freeze({
    username: '',
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
    const u = e.target.username.value;
    const url = `users/${u}/`;
    axiosInstance
        .get(url, {
        })
        .then((res) => {
            console.log(res.data)
            history('/users', {state:res.data})
        })
        .catch((error) => {
            console.log(error.response.data);
        })
      
        
        
}



  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
    <div className="container-fluid">
      <Link to = "/home" className="navbar-brand" ><u>Coverers</u></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item px-5">
            <Link className="nav-link active" aria-current="page" to="/selectsong">Upload Your Cover</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link to = "/myprofile" className="dropdown-item" >My Profile</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link to = '/logout' className="dropdown-item" >Logout</Link></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex" onSubmit = {handleSubmit}>
          <input className="form-control me-2" type="search" placeholder="Search By Username" aria-label="Search" name = "username" onChange={handleChange} required/>
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    </React.Fragment>
  )
}

export default Header


