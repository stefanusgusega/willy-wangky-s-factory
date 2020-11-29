import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../css/pages.css';
import {soapMessage} from '../components/Message.js';
import {Table,Card,CardDeck, CardColumns} from "react-bootstrap";
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
	    
		  let message = soapMessage("getResep",[]);
			
		  axios.post("http://localhost:8080/ws-factory/ws/server?wsdl", message,{
			  headers : 
			  { 'Content-type':'text/xml'}
		  }).then(res =>{
			console.log(res);
			var xml = new XMLParser().parseFromString(res.data);
			var data = xml.getElementsByTagName('return');
			var resep = [];
			data[0].children.forEach(function(obj) {
				resep.push(obj.children);
			})
			console.log(resep);
			console.log(resep.slice(1));

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
			
			<CardColumns>
                    {this.state.resep.map((resep,i)=> (
			<div key={i}>
			
                        <Card style={{ minWidth: '18rem', maxWidth: '18rem', marginBlockEnd:'2rem'}}>
                            <Card.Body>
                             <Card.Title>ID Cokelat : {resep[0].value}</Card.Title>
                                <Card.Text>
					
					<Table striped bordered hover responsive style={{backgroundColor:"#7e8a97",color:"white"}}>
							<thead>
							<tr>
							<th>Bahan</th>
							<th>Jumlah</th>
							</tr>
							</thead>
							<tbody>	
							{resep.slice(1).map((bahan,j) => (
							<tr key={j}>
								<td> {bahan.children[1].value}</td>
								<td> {bahan.children[2].value}</td>
							
							</tr> ))}
							</tbody>
					</Table>	
                                </Card.Text>
				
					
                            </Card.Body>
                        </Card><br/><br/></div>
                    ))}
                </CardColumns>
			
			</div>
            		
         </div>
      );
	}
    
    
}
 
export default Recipe;