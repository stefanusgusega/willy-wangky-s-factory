import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import {soapMessage} from '../components/Message.js';
import { Link } from 'react-router-dom'
import {Table} from "react-bootstrap";
import axios from 'axios';

class Ingredients extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: [],
	      saldo :0
	    };
	  }
	
	
	
	componentDidMount() {
	    var XMLParser= require('react-xml-parser');
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
		  );
		  let message = soapMessage('getSaldo',[]);
			console.log(message);

		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			console.log(res);
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			console.log(data);
			this.setState({
				saldo: data[0].value
				});
			console.log(JSON.stringify(data[0].value));
			console.log(data[0].value);
		  }).catch(err=>{ console.log(err)});
  
}
		

	render(){
		return ( 
        <div>

            <NavigationBar/>
	
            <br/><br/><br/><br/>
            <div className="title">
            INGREDIENTS LIST
            </div>
	   <div style={{textAlign:"center"}}>
		Saldo : {this.state.saldo}
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