import React, { Component } from 'react';
import '../css/pages.css';
import NavigationBar from './NavigationBar';
import {Button} from "react-bootstrap";

class Detail extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
	 }

	 componentDidMount() {
	 	var id = this.props.match.params.id;
    	console.log(id);
    	var url = "http://localhost:3000/bahan/" + id;
    	console.log(url);
	    fetch("http://localhost:3000/bahan/" +id)
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
	     console.log(this.state.items)
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
				  	<Button>
				  	Buy
				  	</Button>
			  	</div>
			  	))}




				   
				 
			</div>


		);
	}
}

export default Detail;