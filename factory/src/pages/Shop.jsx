import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import {soapMessage,objectMessage} from '../components/Message.js';
import {Table,Navbar,Nav,Button} from "react-bootstrap";
import axios from 'axios';
import {toXML} from 'jstoxml';
import Confirmation from '../components/Confirmation';
const XMLParser= require('react-xml-parser');

class Shop extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: [],
	      saldo :0,
	      values :[],
	      status:false,
	      sisa:0,
	      canbuy:false,
	      
	      
		
	    };
	  }
	buyBahan=() => {
		let setSaldoMessage = soapMessage("setSaldo",[this.state.sisa]);
		axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", setSaldoMessage,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
		  }).catch(err=>{ console.log(err)});

		var xmlbahan = "";	
		var arrayId = Object.keys(this.state.values).map((key) => Number(key) + 1);
		var arrayJumlah = Object.keys(this.state.values).map((key) => this.state.values[key]);
		var arrayNama = (this.state.items).map((bahan) => bahan.nama_bahan);
		var arrayTanggal = new Array(this.state.items.length).fill('20-12-2020');
		var i;
		for (i=0;i<arrayId.length;i++){
			if (arrayJumlah[i] != 0 ){
				var bahan= {idBahan:arrayId[i],namaBahan:arrayNama[i],jumlah:arrayJumlah[i],tanggalExp:arrayTanggal[i]};
				xmlbahan+="<item>";
				xmlbahan+=toXML(bahan);
				xmlbahan+="</item>";
				
			}
		}
		var addBahanMessage = objectMessage("addBahan","bahan",xmlbahan);
		axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", addBahanMessage,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			console.log(res);
			console.log(xml);
		  }).catch(err=>{ console.log(err)});
		this.handleShow();
		  window.location.reload();
		alert("Ingredients have been bought!");
	}

	handleShow = () =>{
		
		this.setState({show:!this.state.show});
		
	}
	
	 handleChange(i, e) {
	    
            this.setState({
                values: { ...this.state.values, [i]: parseInt(e.target.value) }
                });
	   
	  }
	
	submit = () => {
	console.log(this.state.values);
	var arrayJumlah = Object.keys(this.state.values).map((key) => this.state.values[key]);
	var data = { "jumlah" : arrayJumlah, "saldo" : parseInt(this.state.saldo)
	}
	axios.post("http://localhost:4000/buybahan",data)
	.then((result) => {
	          this.setState({
	            status:result.data.status,
		    sisa:result.data.sisa,
		    canbuy:parseInt(result.data.sisa) != parseInt(this.state.saldo)
	          });
	
	        },
		
	        
	        (error) => {
	          this.setState({
	            error
	          });
	        }
	      );
	
	this.handleShow();
	}
	
	componentDidMount() {
	 
	    fetch("http://localhost:4000/bahan")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result,
		    values: new Array(result.length).fill(0)
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
		let message = soapMessage("getSaldo",[]);
			

		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			this.setState({saldo:data[0].value});
			
			

		  }).catch(err=>{ console.log(err)});

  
}
		

	render(){
		return ( 
        <div>

            <NavigationBar/>
	
            <br/><br/><br/><br/>
            <div className="title">
            SHOP
		<br/> Saldo : {this.state.saldo} 
            </div>
	   <div style={{textAlign:"center"}}>
		
		</div>
            <div style={{padding:"5% 10%"}}>
	            <Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
				  <thead>
				    <tr>
				      <th>Id</th>
				      <th>Name</th>
				      <th>Price</th>
				      <th>Buy</th>
				    </tr>
				  </thead>
				  <tbody>	
				  {this.state.items.map((bahan,i)=> (
				  	<tr key={i}>
				  	<td>{ bahan.id_bahan }</td>

				  	<td>
				  	
				  	{bahan.nama_bahan} 
				  	
				  	</td>
				  	<td> {bahan.harga_bahan}</td>
					<td style={{width:"100px"}}>
		
			<input id={'input-' + bahan.id_bahan} 
                   onChange={this.handleChange.bind(this, i)} type={"number"} min={0} defaultValue={0} style={{width:"100%",margin:"0"}} /> </td>
				  	</tr>
				  	
				  	))}
				   
				  </tbody>
				</Table>
				<Confirmation
				        show={this.state.show}
				        onHide={this.handleShow}
				        sisa ={this.state.sisa}
					status={this.state.status.toString()}
					canbuy = {this.state.canbuy.toString()}
					proceed={this.buyBahan}
				      />
				<Navbar fixed="bottom"  variant="light" style={{backgroundColor:"#bbbfca"}} expand="lg">
                    <Navbar.Brand href="/">Buy now</Navbar.Brand>
                    

                    

                        <Nav className="ml-auto">
                            <Button onClick={this.submit} type="submit"  style={{width:"100%",backgroundColor:"#495464",border:"none"}}>Buy</Button>
                        </Nav>
                   

                </Navbar>
			</div>
            		
         </div>
      );
	}
    
    
}
 
export default Shop;