import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import {soapMessage} from '../components/Message.js';
import {Table} from "react-bootstrap";
import axios from 'axios';
import Cookies from 'js-cookie';

class Ingredients extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      bahan :[]
	    };
	  }
	
	
	
	componentDidMount() {
	if(Cookies.get('user') != "true"){
		this.props.history.push("/login");
	}
	    var XMLParser= require('react-xml-parser');
		  let message = soapMessage("getBahan",[]);
			

		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			console.log(res.data);
			var xml = new XMLParser().parseFromString(res.data);
			console.log(xml);
			var data = xml.getElementsByTagName('return');
			console.log(data);
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
            <div style={{padding:"5% 10%"}}>
	            <Table striped bordered hover responsive style={{backgroundColor:"white",color:"black"}}>
				  <thead style={{backgroundColor:"#f2a07b"}}>
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