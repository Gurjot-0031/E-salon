import React,{Component} from "react";
import AppHeader from "./AppHeader";

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
            isRegistering: false
        }
        this.login = this.login.bind(this);
    }


    login() {
        const myInit = {
            method: "POST",
            headers: {
                //"Accept": "application/json",
                "Content-Type": "application/json"
            },
            mode: "cors",
            cache: "default",
            body: JSON.stringify(this.state)
        };
        let myRequest = new Request("http://localhost:8080/rest/users/authenticate",myInit);
        let checkFetch = function(response){
            if(!response.ok){
                throw Error(response.statusText+"  "+response.url);
            }
            return response;
        };
        fetch(myRequest)
            .then(checkFetch)
            .then(result=>{
                result.json().then(resp=>{
                    // if(resp.username)
                    console.log(resp);
                    localStorage.setItem("loggedIn",resp);
                })
        }).catch(error=>console.warn("error "+error));
        //alert("Stringified Resp"+localStorage.getItem("auth"));
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
                                    <form onSubmit={()=>this.login}>
                                        <input type={"text"} id={"unameBox"}
                                               onChange={(e)=>
                                               {this.setState({username:e.target.value})}} required>
                                        </input>
                                        <label htmlFor={"unameBox"}>Username:</label>
                                        <input type={"text"} id={"passwordBox"}
                                               onChange={(e)=>
                                               {this.setState({password:e.target.value})}} required>
                                        </input>
                                        <label htmlFor={"passwordBox"}>Password:</label>
                                        <center>
                                            <button type={"submit"} >LOGIN</button>
                                            {/*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*/}
                                        </center>
                                        <center>
                                            <button onClick={()=>this.setState({isRegistering:true})}>Go to REGISTER</button>
                                            {/*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*/}
                                        </center>
                                    </form>
                                    :
                                    <form onSubmit={()=>{this.register()}}>
                                        <input type={"text"} id={"nameBox"}
                                               onChange={(e)=>
                                               {this.setState({name:e.target.value})}} required>
                                        </input>
                                        <label htmlFor={"nameBox"}>Name:</label>
                                        <input type={"text"} id={"unameBox2"}
                                               onChange={(e)=>
                                               {this.setState({username:e.target.value})}} required>
                                        </input>
                                        <label htmlFor={"unameBox2"}>Username:</label>
                                        <input type={"text"} id={"passwordBox2"}
                                               onChange={(e)=>
                                               {
                                                   validatePWD();
                                                   this.setState({password:e.target.value});
                                               }} required>
                                        </input>
                                        <label htmlFor={"passwordBox2"}>Password:</label>
                                        <input type={"text"} id="cnfpwdBox"
                                               onChange={(e)=>
                                               {
                                                   validatePWD();
                                                   this.setState({cnfpassword:e.target.value});
                                               }} required>
                                        </input>
                                        <label htmlFor={"cnfpwdBox"}>Confirm Password:</label>

                                        <center>
                                            <button type={"submit"}>REGISTER</button>
                                            {/*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*/}
                                        </center>
                                        <center>
                                            <button onClick={()=>this.setState({isRegistering:false})}>Go to Login</button>
                                            {/*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*/}
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