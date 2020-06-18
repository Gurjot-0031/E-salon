import React, {Component} from 'react';
import AppHeader from "./AppHeader";
import  "../App.css";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editname :false,
            editemail :false,
            editphone :false,
        };
        //this.edit = this.edit.bind(this);

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
                <h4><div align='center'>My Account</div></h4>
                <table className='MyAccountTable '>
                    <tbody>
                    {
                        Object.keys(this.state)
                            .filter(i => !i.startsWith('edit'))
                            .map(i =>
                                <tr key={i}>
                                    <td className='col s2 '>{[i]}</td>
                                    <td className='col s3' >{this.state[i]}</td>
                                    {this.state['edit'+[i]] ? <td className='col s3'>
                                    <textarea rows="1" cols="10"
                                              style={{'resize':'none'}}
                                              placeholder={'edit'+[i]+" "+this.state['edit'+[i]]}/>
                                        </td>
                                        :null}

                                    {[i] == 'uid' || [i] == 'username' ? null : <td className='col s1'>
                                        <button className='material-icons'
                                                         onClick={()=>this.edit(i)}>
                                            edit
                                        </button>
                                    </td>}
                                </tr>
                            )
                    }
                    </tbody>
                </table>

            </div>
        );
    }

    edit(element) {
        const x = "edit" + [element];
        console.log("henlo2: "+x)
        this.setState(prevState=>({
            editname: !prevState.editname,
        }))
        console.log("HENLO "+this.state.editname);
        //document.getElementById('text-'+[element]).hidden = false;
        //alert([element]+"  "+this.state[element])
    }






}

export default MyAccount;