import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';

class Chocolate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            chocos: []
        };
    }
    state = {  }
    render() { 
        return ( 
            <div>
                <NavigationBar/>
               
                
                </div>
          );
    }
}
 
export default Chocolate;