import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import '../css/pages.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import {soapMessage} from '../components/Message.js';

class Login extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      email: "",
	      password:"",
	      valid:"",
	    };
	  }
    

    changePage = () =>{
	if (this.state.valid == "true"){
		console.log("ayok");
	}
	console.log("yah");


	}	

    handleSubmit = (event) =>{
	event.preventDefault();
	var XMLParser= require('react-xml-parser');
	var valid;
	let message = soapMessage('login',[this.state.email,this.state.password]);
			console.log(message);

		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			this.setState({
				valid: data[0].value
				});
			Cookies.set('user',data[0].value, {expires : 1 });
			console.log(data[0].value);
		  }).catch(err=>{ console.log(err)});
	
	window.location.reload();
	

	
	}
	

	componentDidMount(){	
		if(Cookies.get('user') == "true"){
			this.props.history.push("/");
		} else if (Cookies.get('user') == 'false') {
		alert("Email or password is not valid");
		}
}

    render() { 
        return ( 
            <div className="center-screen">
            	<div className="title">
            		Willy Wangko Factory
            	</div>
            	<Form style={{padding:"5%",textAlign:"center"}} onSubmit= {this.handleSubmit}>
					  <Form.Group controlId="formBasicEmail" style={{paddingBottom:"5%"}}>
					    <Form.Control className="inputbox" type="email" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})} />
					    <Form.Text className="text-muted">
					      We'll never share your email with anyone else.
					    </Form.Text>
					  </Form.Group>

					  <Form.Group controlId="formBasicPassword">
					    <Form.Control type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
					  </Form.Group>
					  <br/>
					  <div style={{textAlign:"center"}}>
						  <Button disabled={this.state.email== "" || this.state.password== ""} style={{padding:"1% 10%",fontSize:"1.2vw",backgroundColor:"#30475e",border:"none"}} className="login" type="submit" value="Submit">
						    Login
						  </Button>
					  </div>
					</Form>
            </div>
          );
    }
}
 
export default Login;