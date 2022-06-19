import React from "react";
import {Link} from 'react-router-dom';


export default function Index() {
	return (
		<div>
			<center>
				<br /><br /><br />
				<h6>WELCOME TO</h6>
				<br />
				<h1 className="text text-danger"><u>Coverers</u></h1>
				<br /><br />
				<div className="container">
					<div className="row">
						<div className="col border-end border-danger">
							New User?
							<div className="block">
								Then <b>Register</b> Here
							</div>
							<br /><br />
							<div className="block">
								<Link to="/register" className="btn btn-danger">Register</Link>
							</div>

						</div>
						<div className="col">
							Already Have an account?
							<div className="block">
								Then <b>Login</b> Here
							</div>
							<br /><br />
							<div className="block">
								<Link to ="/login" className="btn btn-danger">Login</Link>
							</div>
						</div>
					</div>
				</div>
			</center>
		</div>
	)
}