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
        if(this.state.name === undefined || this.state.username === undefined || this.state.password === undefined || this.state.cnfpassword === undefined
            || this.state.name === null || this.state.username === null || this.state.password === null || this.state.cnfpassword === null
            || this.state.email === null || this.state.email === undefined
                || this.state.phone === null || this.state.phone === undefined)
            {
                if(this.state.signUpErrors.find(item => item === "All fields are required") === undefined){
                    this.setState(prevState =>({
                        ...prevState, signUpErrors: [...prevState.signUpErrors,"All fields are required"]
                    }));
                }
                return ;
            }
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
                    if(parsedResp.username == null)
                        this.setState(prevState =>({
                            ...prevState, signUpErrors: ["Username already exists, try a different one"]
                        }))
                    localStorage.setItem("isLoggedIn",parsedResp.isSuccess);
                    localStorage.setItem("loggedUserId",parsedResp.uid);
                    localStorage.setItem("loggedUsername",parsedResp.username);
                    this.setState({uid:parsedResp.uid})
                    this.setState({username:parsedResp.username})
                    this.setState({isLoggedIn:parsedResp.isSuccess})

                })
        }
        else{
            if(this.state.signUpErrors.find(item => item === "Passwords do not match") === undefined){
                this.setState(prevState =>({
                    ...prevState, signUpErrors: [...prevState.signUpErrors,"Passwords do not match"]
                }))
            }

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
            backgroundColor: "#d9efe6"
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
                <table className="myAccountTable" >
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
                            <label>Email
                                <input type={"text"}
                                       name={"email"}
                                       value={this.state.email}
                                       onChange={(event)=>
                                       {this.handleChange(event)}} required>
                                </input>
                            </label>
                            <label>Phone
                                <input type={"text"}
                                       name={"phone"}
                                       value={this.state.phone}
                                       onChange={(event)=>
                                       {this.handleChange(event)}} required>
                                </input>
                            </label>
                            <label>Set a password
                                <input type={"password"}
                                       name={"password"}
                                       value={this.state.password}
                                       onChange={(event)=>
                                       {
                                           {this.handleChange(event)}
                                       }} required>
                                </input>
                            </label>
                            <label>Confirm password
                                <input type={"password"}
                                       name={"cnfpassword"}
                                       value={this.state.cnfpassword}
                                       onChange={(event)=>
                                       {
                                           this.handleChange(event);
                                       }} required>
                                </input>
                            </label>
                            {this.state.signUpErrors.map(error=> <p style={{'color':'red'}}>
                                        {error}<br/></p>)}

                            <input type={"submit"} className={"input-field col s12 btn"}
                                onClick={this.register}
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
                </table>
            </div>
            </div>
        );
    }

    loginClicked() {
        this.props.isRegisteringToggle(false);
    }
}