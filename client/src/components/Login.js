import React,{Component} from "react";
import AppHeader from "./AppHeader";

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: false,
            loggedUsername: "",
            username:"",
            password:""
        };
        this.login = this.login.bind(this);
        //this.render = this.render.bind(this);
    }


     login() {
        console.log("Testing.......");


         fetch("http://localhost:8080/rest/users/authenticate",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //mode: 'no-cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept':  '*/*',
                //'Cache-Control': 'no-cache'
                //"Vary":"Access-Control-Request-Headers"
                //'Origin':'*'
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            //redirect: 'follow', // manual, *follow, error
            //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        })
            .then(response=> response.json())
            .then(parsedData => {
                console.log('parsed data ' +parsedData.username+" "+parsedData.isSuccess); // JSON data parsed by `response.json()` call
                return parsedData;
            })
             //.then(data=>this.setState({loggedUsername:data.username,isLoggedIn:true}))
             .then(data=>localStorage.setItem("data",data))
            .catch(error=>console.log("CAUGHT ERROR "+error));
    }
    render() {

        let st = {
            //backgroundImage: url("/pics/loginBack.jpg"),
            backgroundColor: "#b2c4bd"
        }
        //var auth=JSON.parse(localStorage.getItem("auth"));
        return (
            <div>
            <AppHeader/>
            {/*<AppFooter/>*/}
            <div style={st}>
                {/*{*/}
                {/*    auth ? <Redirect to="home"></Redirect>:null*/}
                {/*}*/}
                <div>
                    <div className="materialboxed">
                        <label>
                            <input type={"text"} name={"username"}
                                   value={this.state.username}
                                   onChange={this.handleUsernameChange.bind(this)} required>
                            </input>
                        </label>
                        <label>
                            <input type={"text"} name={"password"}
                                   value={this.state.password}
                                   onChange={this.handlePasswordChange.bind(this)} required>
                            </input>
                        </label>
                        <input type="button"
                               onClick={this.login.bind(this)}
                               className="fixed-action-btn" value={"LOGIN"}
                        />
                        {/*<center>*/}
                        {/*    <button type={"submit"} >LOGIN</button>*/}
                        {/*    /!*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*!/*/}
                        {/*</center>*/}
                        {/*<center>*/}
                        {/*    <button onClick={()=>this.setState({isRegistering:true})}>Go to REGISTER</button>*/}
                        {/*    /!*<p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>*!/*/}
                        {/*</center>*/}
                    </div>
                </div>
            </div>
            </div>
        );
    }

    handleUsernameChange(event) {
        this.setState({username:event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password:event.target.value});
    }
}