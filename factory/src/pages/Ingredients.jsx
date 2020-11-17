import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import { Link } from 'react-router-dom'
import {Table} from "react-bootstrap";

class Ingredients extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
	  }

	  componentDidMount() {
	    fetch("http://localhost:3000/bahan")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )

	  }

	render(){
		return ( 
        <div>

            <NavigationBar/>

            <br/><br/><br/><br/>
            <div className="title">
            INGREDIENTS LIST
            </div>
            <div style={{padding:"5% 10%"}}>
	            <Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
				  <thead>
				    <tr>
				      <th>Id</th>
				      <th>Name</th>
				      <th>Price</th>
				    </tr>
				  </thead>
				  <tbody>	
				  {this.state.items.map((bahan)=> (
				  	<tr>
				  	<td>{ bahan.id_bahan }</td>

				  	<td>
				  	<Link to={{pathname:"/ingredients/" + bahan.id_bahan, id:bahan.id_bahan}} className="linkto">
				  	{bahan.nama_bahan} 
				  	</Link>
				  	</td>
				  	<td> {bahan.harga_bahan}</td>
				  	</tr>
				  	
				  	))}
				   
				  </tbody>
				</Table>
			</div>
            		
         </div>
      );
	}
    
    
}
 
export default Ingredients;