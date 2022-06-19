import React, { useRef, useState } from 'react';
import axiosInstance from '../axios';
import Header from './Header';



export default function MyProfile(){ 
	axiosInstance
    	.get(`myprofile/`, 
        	 {headers:{
            	 'Authorization': "JWT " + 
             	localStorage.getItem('access_token')}})
				 .then((res) => {
					setuserName(res.data.username);
					setemail(res.data.email);
					setfirst_name(res.data.first_name);
					setlast_name(res.data.last_name);
					setfollowers(res.data.followers.length);
					setfollowing(res.data.following.length);
					
					

				  })
		  
				const [userName, setuserName] = useState('');
				const [email, setemail] = useState('');
				const [first_name, setfirst_name] = useState('');
				const [last_name, setlast_name] = useState('');
				const [followers, setfollowers] = useState('');
				const [following, setfollowing] = useState('');

		  
			  return (
				  
				  <div>
					  <Header/>
					  <br/><br/>
					  <center>
						  <h4>Your Details</h4>
					  </center>
						  <br/><br/>
					  <center>
						  <div className="container">		
							  <div className="row" style={{marginBottom:'20px'}}>
								  <div className="col border border-dark">
										<b>Username</b>
								  </div>
								  <div className="col border border-dark" id="username">
									  { userName }
								  </div>
							  </div>
							  <div className="row" style={{marginBottom:'20px'}}>
								  <div className="col border border-dark">
										<b>First Name</b>
								  </div>
								  <div className="col border border-dark" id="first_name">
										{ first_name }
								  </div>
							  </div>
							  <div className="row" style={{marginBottom:'20px'}}>
								  <div className="col border border-dark">
										<b>Last Name</b>
								  </div>
								  <div className="col border border-dark" id = "last_name">
									   { last_name }
								  </div>
							  </div>
							  <div className="row" style={{marginBottom:'20px'}}>
								  <div className="col border border-dark">
										<b>Email</b>
								  </div>
								  <div className="col border border-dark" id = "email">
									   { email }
								  </div>
							  </div>
							  <div className="row" style={{marginBottom:'20px'}}>
								  <div className="col border border-dark">
										<b>Followers</b>
								  </div>
								  <div className="col border border-dark" id = "email">
									   { followers }
								  </div>
							  </div>
							  <div className="row" style={{marginBottom:'20px'}}>
								  <div className="col border border-dark">
										<b>Following</b>
								  </div>
								  <div className="col border border-dark" id = "email">
									   { following }
								  </div>
							  </div>
						  </div>
					  </center>
				  </div>
			  )
		  }