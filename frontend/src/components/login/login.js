import React, { Component } from "react";
import "./log.css";
import axios from 'axios';
import urlFor from './../../helpers/urlFor';
import Flash from './../../lib/Flash';
import './../home/index.css'
import auth from "./../../authguard/auth";
import { openLoginForm, openRegisterForm } from "./login-utils";

class login extends Component {
	constructor(props) {
		super(props);
		if(auth.isAuthenticated()){
			this.props.history.push("/home")
		}
		this.state = {
						username: '',
						password:'',
						confirm_pwd:'',
						usernameLogin:'',
						passwordLogin:'',
						error:''
					};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		axios
        .post(
          urlFor("app/user/"),
           this.state,
        )
        .then(res => {
			alert('Successfully Registered');
		})
		.catch(res=>{
			const errorObj = res.response.data.error;
			let errorString = "";
			Object.keys(errorObj).forEach((key) => errorObj[key].forEach(errMsg => errorString += errMsg + "\n"));
			console.log(errorString)
			this.setState({ error: errorString });
		});		
	}11
	
	handleChange(event) {
		let obj={}
		console.log(event.currentTarget.name)
		obj[event.currentTarget.name]=event.currentTarget.value;
		this.setState(obj);
	}


	handleLoginSubmit(e) {
		e.preventDefault();
		axios
        .post(
          urlFor("app/user/auth/"),
           {"username":this.state.usernameLogin,"password":this.state.passwordLogin},
        )
        .then(res => {
			window.localStorage.setItem("userId", res.data.userId);
			auth.login(() => {
				this.props.history.push("/home");
			  },res.data.token);
		})
		.catch(res=>{
			this.setState({ error:res.response.data.message });
		});		
	}

	resetError = () => {
		this.setState({ error: '' });
	  }
	
 	
	render() {
		const { error } = this.state;

	return (
      <div style={{marginTop:100}}>
	   {error && <Flash error={error} resetError={this.resetError} />}
       <div className="container">
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-login">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-6">
								<a href="#" onClick={(e) => openLoginForm(e)} className="active" id="login-form-link">Login</a>
							</div>
							<div className="col-xs-6">
								<a href="#" onClick={(e) => openRegisterForm(e)} id="register-form-link">Register</a>
							</div>
						</div>
						<hr />
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
								<form id="login-form" role="form" style={{"display": "block"}}>
									<div className="form-group">
										<input type="text" name="usernameLogin" id="usernameLogin" value={this.state.usernameLogin} placeholder="Username" className="form-control" maxLength="10" pattern="\d{10}" onChange={this.handleChange} />
									</div>
									<div className="form-group">
									<input type="password" name="passwordLogin" id="passwordLogin" value={this.state.passwordLogin} className="form-control" placeholder="Password" onChange={this.handleChange}/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" name="login-submit" id="login-submit" className="form-control btn btn-login" onChange={this.handleChange} value="Log In" onClick={this.handleLoginSubmit}/>
											</div>
										</div>
									</div>
								</form>
									
									
								<form id="register-form" style={{"display": "none"}}>
									<div className="form-group" onSubmit={this.handleSubmit}>
										<input type="text" name="username" id="usernname" value={this.state.username} className="form-control" placeholder="Username" maxLength="10" pattern="\d{10}" onChange={this.handleChange}/>
									</div>
									<div className="form-group">
										<input type="password" name="password" id="password" value={this.state.password} className="form-control" placeholder="Password" onChange={this.handleChange}/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" className="form-control btn btn-register" value="Register Now" onClick={this.handleSubmit} onChange={this.handleChange}/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

    </div>
    );
  }
}

export default login;

