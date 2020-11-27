import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import {soapMessage} from '../components/Message.js';
import {Table,Button} from "react-bootstrap";
import axios from 'axios';
import Confirmation from '../components/Confirmation';
var XMLParser= require('react-xml-parser');

class Order extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      valid:false,
	      addstock:[],
	      id: -1
	      
	    };
	  }
    changeStatus = () => {
	console.log(this.state.id);
	let message = soapMessage("changeStatusAddStock",[this.state.id]);
	axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var valid = data[0].value;
			console.log(valid);
		  }).catch(err=>{ console.log(err)});
	let message2 = soapMessage("removeBahan",[this.state.id]);
	axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message2,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var valid = data[0].value;
			console.log(valid);
		  }).catch(err=>{ console.log(err)});
	let message3 = soapMessage("addCoklat",[this.state.id]);
	axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message3,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var valid = data[0].value;
			console.log(valid);
		  }).catch(err=>{ console.log(err)});
	alert("Chocolate sudah dikirim");
	window.location.reload();


    }
    changeStatusRequest = (id)=> {	
	this.setState({id});
	let message = soapMessage("canChangeStatus",[id]);
	
		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var valid = data[0].value;
			console.log(valid);
			this.setState({valid});
		  }).catch(err=>{ console.log(err)});
	this.setState({valid:"true"});
	this.handleShow();

	}
handleShow = () =>{
		
		this.setState({show:!this.state.show});
		
	}
	
    componentDidMount() {
	
	let message = soapMessage("getAddStock",[]);
			

		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var addstock = [];
			data[0].children.forEach(function(obj) {
				addstock.push(obj.children);
			})
			this.setState({addstock});
			
			

		  }).catch(err=>{ console.log(err)});


	}
    render() { 
        return ( 
            <div>
                <NavigationBar/>
               <br/><br/><br/><br/>
            <div className="title">
            ADD STOCK REQUEST LIST
            </div>
	   <div style={{textAlign:"center"}}>
		
		</div>
            <div style={{padding:"5% 10%"}}>
	            <Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
				  <thead>
				    <tr>
				      <th>Id</th>
				      <th>Id Cokelat</th>
				      <th>Jumlah</th>
				      <th>Status</th>
				    </tr>
				  </thead>
				  <tbody>	
				  {this.state.addstock.map((bahan,i)=> (
				  	<tr key={i}>
				  	<td>{ bahan[0].value }</td>

				  	<td>
				  	
				  	{bahan[1].value} 
				  	</td>
				  	<td> {bahan[2].value}</td>
					<td> <Button disabled={bahan[3].value == "delivered"} onClick={() => this.changeStatusRequest(bahan[0].value)}> {bahan[3].value} </Button></td>
				  	</tr>
				  	
				  	))}
				   
				  </tbody>
				</Table>
			</div>
			<Confirmation
				        show={this.state.show}
				        onHide={this.handleShow}
					order={this.state.valid.toString()}
					
					proceed={this.changeStatus}
				      />
            		
         </div>
          );
    }
}
 
export default Order;