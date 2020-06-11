import React, {Component} from 'react';
import AppHeader from "./AppHeader";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        fetch("http://localhost:8080/rest/users/getUserDetails",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept':  '*/*',
            },
            body: localStorage.getItem("loggedUsername")
        })
            .then(response=> response.json())
            .then(result => {
                this.setState({
                    name: result.name,
                    username: result.username
                })
            })
    }


    render(){
        return (
            <div>
                <AppHeader/>
                <div className='table-of-contents'>
                    <div>Name: {this.state.name}</div>
                    <div>Username: {this.state.username}</div>
                </div>

            </div>
        );
    }
}

export default MyAccount;