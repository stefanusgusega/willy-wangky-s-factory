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
	      price: []
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
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
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
		fetch("http://localhost:3000/bahan/" +id +"/" + this.state.total)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            price : result
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            error
	          });
	        }
	      );
	    console.log(this.state.price);
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
				        total ={this.state.price}
				      />
			  	</div>
			  	))}




				   
				 
			</div>


		);
	}
}



export default Detail;

