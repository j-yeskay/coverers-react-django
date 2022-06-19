import React, { useRef, useState } from 'react';
import axiosInstance from '../axios';
import Header from './Header';
import { useLocation, Link } from 'react-router-dom';


export default function FindUsers(){
    const location = useLocation();
    const users = location.state;
    

    if(users.length == 0){
        return(
            <div>
                <Header/>
                <center>
                    <br /><br />
                    <h3>No Results</h3>
                    <hr />
                </center>
            </div>
        )
    }

    
    
    return(
       <div>
           <Header/>
           <center>
           <br /><br />
                <h3>Search Results</h3>
                <hr />
           </center>
           <div className="container">
               {users.map((item, index) => 
               <div className='row' style={{marginBottom:"20px"}} key={index}>
                   <div className = "col border border-dark">
                        {item.username}
                   </div>
                   <div className="col border border-dark">
                        <Link to = "/user" state = {{ userid : item.id }} className="btn btn-link">View Account</Link>
                    </div>
               </div>
               )}
           </div>
           
       </div>
    )
}