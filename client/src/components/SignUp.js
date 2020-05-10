import React,{Component} from "react";
import AppHeader from "./AppHeader";
import {Redirect} from 'react-router-dom';

export default class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state={
            signUpErrors:[]
        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    register() {
        if(this.state.password === this.state.cnfpassword) {
            fetch('http://localhost:8080/rest/users/addUser',
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.state)
                }).then(result => result.json())
                .then(parsedResp => {
                    localStorage.setItem("isLoggedIn",parsedResp.isSuccess);
                    localStorage.setItem("loggedUsername",parsedResp.username);
                    this.setState({username:parsedResp.username})
                    this.setState({isLoggedIn:parsedResp.isSuccess})
                })
        }
        else{
            this.state.signUpErrors.push("Passwords do not match");
        }
    }

    handleChange(event) {
        console.log(event.target.name);
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state.name);
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.cnfpassword);
    }

    render() {

        if(this.state.isLoggedIn)
            return <Redirect to = "/home" />
        let st = {
            //backgroundImage: url("/pics/loginBack.jpg"),
            backgroundColor: "#b2c4bd"
        }
        var auth=JSON.parse(localStorage.getItem("auth"));
        return (
            <div>
            <AppHeader/>
            {/*<AppFooter/>*/}
            <div style={st} className={"container"}>
                {/*{*/}
                {/*    auth ? <Redirect to="home"></Redirect>:null*/}
                {/*}*/}
                <div className="table-of-contents " >
                    <div className="row">
                        <div className="col s4 offset-s4">
                            {/*<h4>E-Salon</h4>*/}
                            <label>Name
                                <input type={"text"}
                                       name={"name"}
                                       value={this.state.name}
                                       onChange={(event)=>
                                       {this.handleChange(event)}} required>
                                </input>
                            </label>
                            <label>Username
                                <input type={"text"}
                                       name={"username"}
                                       value={this.state.username}
                                       onChange={(event)=>
                                       {this.handleChange(event)}} required>
                                </input>
                            </label>
                            <label>Set a password
                                <input type={"text"}
                                       name={"password"}
                                       value={this.state.password}
                                       onChange={(event)=>
                                       {
                                           {this.handleChange(event)}
                                       }} required>
                                </input>
                            </label>
                            <label>Confirm password
                                <input type={"text"}
                                       name={"cnfpassword"}
                                       value={this.state.cnfpassword}
                                       onChange={(event)=>
                                       {
                                           this.handleChange(event);
                                       }} required>
                                </input>
                            </label>
                            <label>
                                {this.state.signUpErrors.forEach(error=>error)}
                            </label>
                            <input type={"button"} className={"input-field col s12 btn"}
                                onClick={this.register.bind(this)}
                                value={"REGISTER"}
                            />
                            <label>Already a user?
                                <input type="button" className="input-field col s12 btn"
                                       onClick={this.loginClicked.bind(this)}
                                       value={"Go to LOGIN"}
                                />
                            </label>

                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    loginClicked() {
        this.props.isRegisteringToggle(false);
    }
}