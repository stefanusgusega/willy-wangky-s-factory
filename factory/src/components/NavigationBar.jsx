import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class NavigationBar extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar fixed="top" bg="white" expand="lg">
                    <Navbar.Brand href="/">Factory</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/"> Order </Nav.Link>
                        <Nav.Link href="/ingredients"> Ingredients </Nav.Link>
                        <Nav.Link href="/recipe"> Recipe </Nav.Link>
                        <Nav.Link href="/chocolate"> Chocolate </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/login">Logout</Nav.Link>
                    </Nav>

                </Navbar>

            </div>
        );
    }
}
 
export default NavigationBar;