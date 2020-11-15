import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class NavigationBar extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar fixed="top" bg="white" expand="lg">
                    <Navbar.Brand href="#">Factory</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>

                </Navbar>

            </div>
        );
    }
}
 
export default NavigationBar;