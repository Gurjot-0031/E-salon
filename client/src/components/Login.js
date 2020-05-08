import React,{Component} from "react";
import AppHeader from "./AppHeader";
import SignUp from "./SignUp";
import {Redirect} from 'react-router-dom';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: false,
            loggedUsername: "",
            username:"",
            password:"",
            isRegistering:false
        };
        this.login = this.login.bind(this);
        //this.render = this.render.bind(this);
    }


     login() {
        console.log("Testing.......");
         fetch("http://localhost:8080/rest/users/authenticate",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept':  '*/*',
            },
            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        })
            .then(response=> response.json())
            .then(parsedData => {
                console.log('parsed data==> ' +parsedData.username+" "+parsedData.isSuccess); // JSON data parsed by `response.json()` call
                return parsedData;
            })
             //.then(data=>this.setState({loggedUsername:data.username,isLoggedIn:true}))
             .then(data=>{
                 this.setState({isLoggedIn:data.isSuccess});
                 this.setState({loggedUsername:data.username});
                 localStorage.setItem("isLoggedIn",data.isSuccess);
                 localStorage.setItem("loggedUsername",data.username);
                 console.log(this.state)
             })
            .catch(error=>console.log("ERROR WHILE LOGGING IN "+error));

    }


    render() {
        let st = {
            //backgroundImage: url("/pics/loginBack.jpg"),
            backgroundColor: "#b2c4bd"
        }
        //var auth=JSON.parse(localStorage.getItem("auth"));
        if(!this.state.isRegistering)
            return (
                <div>
                    <AppHeader/>
                    {/*<AppFooter/>*/}
                    <div style={st} className={"container"}>
                        {/*{*/}
                        {/*    auth ? <Redirect to="home"></Redirect>:null*/}
                        {/*}*/}
                        <div className="row">
                            <div className="col s6 offset-s3">
                                <label className="input-field col s12">Enter username
                                    <input type={"text"} name={"username"}
                                           value={this.state.username}
                                           onChange={this.handleUsernameChange.bind(this)} required>
                                    </input>
                                </label>
                                <label className="input-field col s12">Enter password
                                    <input type={"text"} name={"password"}
                                           value={this.state.password}
                                           onChange={this.handlePasswordChange.bind(this)} required>
                                    </input>
                                </label>
                                <input type="button" className="input-field col s12 btn"
                                       onClick={this.login.bind(this)}
                                       value={"LOGIN"}
                                />
                                <label>
                                    New User?
                                    <input type="button" className="input-field col s12 btn"
                                           onClick={this.registerClicked.bind(this)}
                                           value={"Go to REGISTER"}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            );
        else
            return <SignUp
                isRegisteringToggle={this.isRegisteringDataComingFromSignUp.bind(this)}
            />;
    }

    handleUsernameChange(event) {
        this.setState({username:event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password:event.target.value});
    }

    registerClicked() {
        this.setState({isRegistering:true});
    }

    isRegisteringDataComingFromSignUp(param) {
        this.setState({isRegistering:param})
    }

}