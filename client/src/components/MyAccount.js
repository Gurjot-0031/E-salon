import React, {Component} from 'react';
import AppHeader from "./AppHeader";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        fetch("http://localhost:8080/rest/users/getUserDetails", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: JSON.stringify({username : localStorage.getItem("loggedUsername")})
        })
            .then(response => response.json())
            .then(result => {
                //console.log("setting UID: "+result.uid);
                this.setState({
                    username: result.username,
                    uid: result.uid,
                    name: result.name,
                    email: result.email,
                    phone: result.phone
                })
            })
    }
    render(){
        return (
            <div>
                <AppHeader/>
                <div className='table'>
                    <div>Name: {this.state.uid}</div>
                    <div>Username: {this.state.username}</div>
                    <div>Name: {this.state.name}</div>
                    <div>Username: {this.state.email}</div>
                    <div>Username: {this.state.phone}</div>
                </div>

            </div>
        );
    }
}

export default MyAccount;