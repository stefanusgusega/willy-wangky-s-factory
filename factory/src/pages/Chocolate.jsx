import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import {soapMessage} from '../components/Message.js';
import {Table} from 'react-bootstrap';
import Cookies from 'js-cookie';
const XMLParser = require('react-xml-parser');

class Chocolate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            chocos: []
        };
    }
    
    componentDidMount() {
	if(Cookies.get('user') != "true"){
		this.props.history.push("/login");
	}
        var msg = soapMessage("getChocos",[]);
        console.log(msg);
        axios.post("http://localhost:8080/ws-factory/ws/server?wsdl",msg,{
            headers:
            {'Content-type':'text/xml'}
        }).then(res => {
            console.log(res.data);
            var xml = new XMLParser().parseFromString(res.data);
            var data = xml.getElementsByTagName('return');
            var coklat = [];
            // console.log(data);
            data[0].children.forEach(function (obj) {
                coklat.push(obj.children)
            })
            console.log(coklat);
            this.setState({chocos: coklat});
        }).catch(err=> {console.log(err)});
    }
    render() { 
        return ( 
            <div>
                <NavigationBar/>
                <br/><br/><br/><br/>
                <div className="title">
                    CHOCOLATES AVAILABLE    
                </div>
                <div style={{padding: "5% 10%"}}>
                    <Table striped bordered hover responsive style={{backgroundColor:"white",color:"black"}}>
                    <thead style={{backgroundColor:"#f2a07b"}}>
                            <tr>
                                <th style={{textAlign: "center"}}>No</th>
                                <th>Nama Cokelat</th>
                                <th>Jumlah Cokelat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.chocos.map((chocos,i) => (
                                <tr key={i}>
                                    <td style={{textAlign: "center"}}>
                                        {chocos[0].value}
                                    </td>
                                    <td>
                                        {chocos[1].value}
                                    </td>
                                    <td>
                                        {chocos[2].value}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
          );
    }
}
 
export default Chocolate;