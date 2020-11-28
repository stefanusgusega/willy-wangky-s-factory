import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import {soapMessage} from '../components/Message.js';
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
                </div>
          );
    }
}
 
export default Chocolate;