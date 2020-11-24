import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Cookies from 'js-cookie';
class NavigationBar extends Component {
    state = {  }

    logout = () => {
	Cookies.remove('user');


	}
    render() { 
        return ( 
            <div>
                <Navbar fixed="top" bg="white" expand="lg">
                    <Navbar.Brand href="/">Factory</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mr-auto">
                            <Nav.Link href="/"> Order </Nav.Link>
                            <Nav.Link href="/ingredients"> Ingredients </Nav.Link>
                            <Nav.Link href="/recipe"> Recipe </Nav.Link>
                            <Nav.Link href="/chocolate"> Chocolate </Nav.Link>
			    <Nav.Link href="/shop"> Shop </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/login" onClick={this.logout} >Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

            </div>
        );
    }
}
 
export default NavigationBar;