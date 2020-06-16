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
                    uid: result.uid,
                    username: result.username,
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
                <table className='col s12'>
                    <thead><div align='center'><th>My Account</th></div></thead>
                    {
                        Object.keys(this.state).map(i =>
                            <tr key={i}>
                                <td>{[i]}</td>
                                <td>{this.state[i]}</td>
                                <td><a ><i className='material-icons'>edit</i></a></td>
                            </tr>
                        )
                    }
                </table>

            </div>
        );
    }
}

export default MyAccount;