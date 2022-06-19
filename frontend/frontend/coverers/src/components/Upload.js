import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./Header";
import axiosInstance from "../axios";
import { useState, useEffect } from "react";
import { Navigate } from 'react-router';
 

export default function Upload(){
    
    const history = useNavigate();

    const location = useLocation();
    
    const song = location.state[0];
    const userId = location.state[1];
   

    const [coverVideo, setcoverVideo] = useState(null);

    const handleChange = (e) => {
        if([e.target.name] == 'video'){
            setcoverVideo({
                video: e.target.files
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('coverer', userId);
        formData.append('song', song);
        formData.append('video', coverVideo.video[0]);
        axiosInstance.post(`upload/`, formData);
        
        document.getElementById("submit-btn").style.display = "none";
        document.getElementById("spinner").style.display = "block";
        window.setTimeout(function(){
            window.location.href = "/home";
    
        }, 5000);
    }
    
    return(
        <div>
            <Header />
            <center>
                <br />
                    <h3 className="col"><u>Step 2</u> : Upload Your Video for <u className="text text-warning">{song}</u></h3>
                <hr />
                <form method = "POST" className="form-group" onSubmit={handleSubmit}>
                    <div>
                    <input type = "file" 
                           name="video"
                           onChange={handleChange} 
                           className="btn btn-warning"
                           required />
                    </div>
                    <br /><br />
                    <button id = "submit-btn" className="btn btn-danger">Upload!</button>
                </form>
                <br /><br />
                <div id = "spinner" style = {{ display:"none" }}className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </center>
            
            <br />

        </div>
    )
}