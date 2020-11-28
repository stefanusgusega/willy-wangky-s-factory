import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import {soapMessage} from '../components/Message.js';
import {Table,Card,CardDeck, Col} from "react-bootstrap";
import axios from 'axios';
import Cookies from 'js-cookie';

class Recipe extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: [],
	      resep :[]
	    };
	  }
		
	componentDidMount() {
		if(Cookies.get('user') != "true"){
			this.props.history.push("/login");
		}
	    var XMLParser= require('react-xml-parser');
	    fetch("http://localhost:3000/result")
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
		  let message = soapMessage("getResep",[]);
			
		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var resep = [];
			data[0].children.forEach(function(obj) {
				resep.push(obj.children);
			})
			console.log(resep);
			this.setState({resep});
		  }).catch(err=>{ console.log(err)});
    }

	render(){
		return ( 
        <div>
            <NavigationBar/>
            <br/><br/><br/><br/>
            <div className="title">RECIPE LIST</div>
	   <div style={{textAlign:"center"}}>
		
		</div>
            <div style={{padding:"5% 10%"}}>
			<CardDeck>
				{/* CONTOH */}
				<Card key={999}  style={{ minWidth: '18rem', maxWidth: '18rem',marginBlockEnd:'2rem'}}>
					<Card.Body>
					<Card.Title>...</Card.Title>
						<Card.Text>
							<Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
								<thead>
									<tr>
									<th>Bahan</th>
									<th>Jumlah</th>
									</tr>
								</thead>
								<tbody>	
								
									<tr key={99}>
										<td>...</td>
										<td>...</td>
									</tr>											
								
								</tbody>
							</Table>
						</Card.Text>
					</Card.Body>
				</Card>
				
                    {this.state.resep.map((resep,i)=> (
                        <Card key={i} style={{ minWidth: '18 rem'}}>
                            <Card.Body>
                            <Card.Title>{resep[0].value}</Card.Title>
                                <Card.Text>
									<Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
										<thead>
											<tr>
											<th>Bahan</th>
											<th>Jumlah</th>
											</tr>
										</thead>
										<tbody>	

										{/* LIST OF BAHAN DAN JUMLAH*/}
										{resep[1].map((bahan,j)=> (
											<tr key={j}>
												<td>{ bahan[0].value }</td>
												<td>{bahan[1].value}</td>
											</tr>											
										))}
										</tbody>
									</Table>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                
			</CardDeck>
			</div>
            		
         </div>
      );
	}
    
    
}
 
export default Recipe;