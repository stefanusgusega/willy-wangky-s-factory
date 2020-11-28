import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Cookies from 'js-cookie';
class Recipe extends Component {
     constructor(props) {
	    super(props);
	    this.state = {
	      
	    };
	  }
    componentDidMount(){
    if(Cookies.get('user') != "true"){
		this.props.history.push("/login");
	}
    }
    render() { 
        return ( 
            <div>
                <NavigationBar/>
               
                
                </div>
          );
    }
}
 
export default Recipe;