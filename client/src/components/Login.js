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
            username:undefined,
            password:undefined,
            isRegistering:false,
            loginErrors : []
        };
        this.login = this.login.bind(this);
        //this.render = this.render.bind(this);
    }


     async login() {
         console.log("Logging in");
         if (this.state.username !== undefined && this.state.password !== undefined) {
            await fetch("http://localhost:8080/rest/users/authenticate", {
                 method: 'POST', // *GET, POST, PUT, DELETE, etc.
                 headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(this.state) // body data type must match "Content-Type" header
            })
                .then(response => response.json())
                .then(parsedData => {
                    console.log('parsed data==> ' + parsedData.username + " " + parsedData.isSuccess); // JSON data parsed by `response.json()` call
                    return parsedData;
                })
                //.then(data=>this.setState({loggedUsername:data.username,isLoggedIn:true}))
                .then(data => {
                    localStorage.setItem("isLoggedIn", data.isSuccess);
                    localStorage.setItem("loggedUsername", data.username);
                    localStorage.setItem("loggedUserId",data.uid);
                    //console.log(this.state)
                    this.setState({loggedUserId: data.uid});
                    this.setState({loggedUsername: data.username});
                    this.setState({isLoggedIn: data.isSuccess});
                })
                .catch(error => console.log("ERROR WHILE LOGGING IN " + error));
     }

        if(!this.state.isLoggedIn) {
            this.setState(prevState => ({
                ...prevState,
                loginErrors: ["Authentication Failed"]
            }))
        }
    }
    componentDidMount() {
        // this.login();
    }

    componentWillUnmount() {
    }


    render() {
        if(this.state.isLoggedIn)
            return <Redirect to={"/home"}/>
        let st = {
            //backgroundImage: url("/pics/loginBack.jpg"),
            backgroundColor: "#d9efe6"
        }
        //var auth=JSON.parse(localStorage.getItem("auth"));
        if(!this.state.isRegistering)
            return (
                <div>
                    <AppHeader/>
                    {/*<AppFooter/>*/}
                    <table className={'MyAccountTable'} >
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
                                    <input type={"password"} name={"password"}
                                           value={this.state.password}
                                           onChange={this.handlePasswordChange.bind(this)} required>
                                    </input>
                                </label>

                                <p style={{'color':'red'}}>
                                        {this.state.loginErrors.map(error => error)}
                                </p>

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
                    </table>
                </div>
            );
        else
            return <SignUp isRegisteringToggle={this.loginClicked.bind(this)}/>;
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

    loginClicked() {
        this.setState({isRegistering:false})
    }
}