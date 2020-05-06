import React,{Component} from "react";
import AppHeader from "./AppHeader";
import Axios from "axios";

function validatePWD() {
    var pwdElement = document.getElementById("passwordBox2");
    var cnfpwdElement = document.getElementById("cnfpwdBox");
    if(pwdElement.value!==cnfpwdElement.value){
        cnfpwdElement.setCustomValidity("Passwords do not match");
    }
    else {
        cnfpwdElement.setCustomValidity("");
    }
}

export default class LoginAndSignUp extends Component{
    constructor(props) {
        super(props);
        this.state={
            isRegistering: false,
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }


    login() {
        console.log("Testing.......");

        // let checkFetch = function(response){
        //     if(!response.ok){
        //         throw Error(response.statusText+" henlo  "+response.url);
        //     }
        //     return response;
        // };
        // fetch("http://localhost:8080/rest/users/authenticate",
        //     {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         //"Accept": "application/json",
        //         //"Access-Control-Allow-Origin": "*"
        //     },
        //     body: JSON.stringify(this.state)
        // })
        //     //.then(checkFetch)
        //     .then(response => response.json())
        //     .then(parsedJson => localStorage.setItem("data",parsedJson))
        //     .catch(error=>localStorage.setItem("error",error));
        //alert("Stringified Resp"+localStorage.getItem("auth"));

        // Example POST method implementation:
        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                //mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
                .catch(error=>{localStorage.setItem("error2",error)});
            return response.json(); // parses JSON response into native JavaScript objects
        }

        postData("http://localhost:8080/rest/users/authenticate", this.state)
            .then(data => {
                console.log(data); // JSON data parsed by `response.json()` call
            });
    }
    register() {
        fetch('http://localhost:8080/rest/users/addUser',
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state)
            }).then(result=>{
            result.json().then(resp=>{
                //console.log("RESP uname "+resp.username);
                localStorage.setItem("auth",JSON.stringify(resp));
                //localStorage.setItem("authJson",resp);
            })
        });
        this.setState({isRegistering: false});
        alert("your account has been created "+localStorage.getItem("auth"));

    }

    render() {

        let st = {
            //backgroundImage: url("/pics/loginBack.jpg"),
            backgroundColor: "#b2c4bd"
        }
        var auth=JSON.parse(localStorage.getItem("auth"));
        return (
            <div>
            <AppHeader/>
            {/*<AppFooter/>*/}
            <div style={st}>
                {/*{*/}
                {/*    auth ? <Redirect to="home"></Redirect>:null*/}
                {/*}*/}
                <div className="table-of-contents " >
                    <div className="row">
                        <div className="col s4 offset-s4">
                            {/*<h4>E-Salon</h4>*/}
                            {
                                !this.state.isRegistering ?
                                    <form onSubmit={this.login} >
                                        <label>
                                            <input type={"text"} name={"username"}
                                                   onChange={(e)=>
                                                   {this.setState({username:e.target.value})}} required>
                                            </input>
                                        </label>
                                        <label>
                                            <input type={"text"} name={"password"}
                                                   onChange={(e)=>
                                                   {this.setState({password:e.target.value})}} required>
                                            </input>
                                        </label>
                                        <input type={"submit"} value={"LOGIN"}/>
                                        {/*<center>*/}
                                        {/*    <button type={"submit"} >LOGIN</button>*/}
                                        {/*    /!*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*!/*/}
                                        {/*</center>*/}
                                        <center>
                                            <button onClick={()=>this.setState({isRegistering:true})}>Go to REGISTER</button>
                                            {/*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*/}
                                        </center>
                                    </form>
                                    :
                                    <form onSubmit={()=>{this.register()}}>
                                        <label>
                                            <input type={"text"} name={"name"}
                                                   onChange={(e)=>
                                                   {this.setState({name:e.target.value})}} required>
                                            </input>
                                        </label>
                                        <label>
                                            <input type={"text"} name={"username"}
                                                   onChange={(e)=>
                                                   {this.setState({username:e.target.value})}} required>
                                            </input>
                                        </label>
                                        <label>
                                            <input type={"text"} name={"password"}
                                                   onChange={(e)=>
                                                   {
                                                       validatePWD();
                                                       this.setState({password:e.target.value});
                                                   }} required>
                                            </input>
                                        </label>
                                        <label>
                                            <input type={"text"} name={"cnfpassword"}
                                                   onChange={(e)=>
                                                   {
                                                       validatePWD();
                                                       this.setState({cnfpassword:e.target.value});
                                                   }} required>
                                            </input>
                                        </label>
                                        <center>
                                            <button type={"submit"}>REGISTER</button>
                                        </center>
                                        <center>
                                            <button onClick={()=>this.setState({isRegistering:false})}>Go to Login</button>
                                        </center>
                                    </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}