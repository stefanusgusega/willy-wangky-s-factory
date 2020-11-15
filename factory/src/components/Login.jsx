import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import '../css/pages.css';

class Login extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="center-screen">
            	<div className="title">
            		Willy Wangko Factory
            	</div>
            	<Form style={{padding:"5%",textAlign:"center"}}>
					  <Form.Group controlId="formBasicEmail" style={{paddingBottom:"5%"}}>
					    <Form.Control className="inputbox" type="email" placeholder="Enter email" />
					    <Form.Text className="text-muted">
					      We'll never share your email with anyone else.
					    </Form.Text>
					  </Form.Group>

					  <Form.Group controlId="formBasicPassword">
					    <Form.Control type="password" placeholder="Password" />
					  </Form.Group>
					  <br/>
					  <div style={{textAlign:"center"}}>
						  <Button style={{padding:"1% 10%",fontSize:"1.2vw",backgroundColor:"#30475e",border:"none"}} className="login" type="submit" href="/">
						    Login
						  </Button>
					  </div>
					</Form>
            </div>
          );
    }
}
 
export default Login;