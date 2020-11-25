import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import {soapMessage} from '../components/Message.js';
import {Table} from "react-bootstrap";
import axios from 'axios';

class Ingredients extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: [],
	      bahan :[]
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
		  let message = soapMessage("getBahan",[]);
			

		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var bahan = [];
			data[0].children.forEach(function(obj) {
				bahan.push(obj.children);
			})
			this.setState({bahan});
			
			

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
		
		</div>
            <div style={{padding:"5% 10%"}}>
	            <Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
				  <thead>
				    <tr>
				      <th>Id</th>
				      <th>Name</th>
				      <th>Jumlah</th>
				      <th>Tanggal Kadaluwarsa </th>
				    </tr>
				  </thead>
				  <tbody>	
				  {this.state.bahan.map((bahan,i)=> (
				  	<tr key={i}>
				  	<td>{ bahan[0].value }</td>

				  	<td>
				  	
				  	{bahan[1].value} 
				  	</td>
				  	<td> {bahan[2].value}</td>
					<td> {bahan[3].value}</td>
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