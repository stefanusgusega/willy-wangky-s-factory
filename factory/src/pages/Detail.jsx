import React, { Component,useState } from 'react';
import '../css/pages.css';
import Confirmation from '../components/Confirmation';
import NavigationBar from '../components/NavigationBar';
import {Modal,Button,Badge,Row,Col} from "react-bootstrap";
class Detail extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      show: false,
	      items: [],
	      total: 1,
	      buy: []
	    };
	 }

	 minus = () =>{
	 	this.setState({total:this.state.total-1});
	 }
	 plus = () =>{
	 	this.setState({total:this.state.total+1});
	 }
	

	 componentDidMount() {
	 	var id = this.props.match.params.id;
    	var url = "http://localhost:3000/bahan/" + id;
    	console.log(url);
	    fetch("http://localhost:3000/bahan/" +id)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            items: result
	          });
	        },
	        
	        (error) => {
	          this.setState({
	            error
	          });
	        }
	      );
	     console.log(this.state.items)

	}

	buyBahan = () =>{
		var id = this.props.match.params.id;
		// nanti diisi saldonya yang bener
		var saldo = 10000;

		fetch("http://localhost:3000/bahan/" +id +"/" + this.state.total +"/"+saldo)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            buy : [result]
	          });
	        },
	        
	        (error) => {
	          this.setState({
	            error
	          });
	        }
	      );
	    console.log(this.state.buy);
	    this.handleShow();
	  
	    
	   
	}

	handleShow = () =>{
		this.setState({show:!this.state.show});
	}
	

	render(){


		return(
			<div>
			<NavigationBar/>
			
			  {this.state.items.map((bahan)=> (
			  	<div className="center-screen">
				  	<div className="title">
				  	{bahan.nama_bahan}
				  	</div>
				  	<br/>
				  	<div style={{textAlign:"center",fontWeight:"bold",}}>
				  	Price
				  	</div>
				  	<div style={{textAlign:"center",fontSize:"3vw"}}>				  
				  	 {bahan.harga_bahan}
				  	</div>
				  	<br/>
				  		<Row>
				  			<Col>
							  	<Button variant="info" onClick={this.minus} disabled={this.state.total == 1}> - </Button>
							</Col>
							<Col>
							  	<Badge style={{marginTop:"2.5%",fontSize:"1.5vw"}}>{this.state.total}</Badge>
						  	</Col>
						  	<Col>
							  	<Button variant="info" onClick={this.plus}> + </Button>
							</Col>
					  	</Row>
					  	<br/><br/>
				  	<Button style={{padding:"0.5% 3%"}} onClick={this.buyBahan} >
				  	Buy
				  	</Button>
				  	<Confirmation
				        show={this.state.show}
				        onHide={this.handleShow}
				        buy ={this.state.buy}
				      />
			  	</div>
			  	))}




				   
				 
			</div>


		);
	}
}



export default Detail;

