import React,{Component} from "react";
import SignUp from "./SignUp";



export default class LoginAndSignUp extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    login() {
        alert("LOGIN CALLED")
    }

    render() {

        let st = {
            //backgroundImage: url("/pics/loginBack.jpg"),
            backgroundColor: "#b2c4bd"
        }
        return (
            <div style={st}>
                <div className="table-of-contents " >
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <th className="center"><h4>E-Salon</h4></th>
                            <tr>
                                <td>
                                    <form >
                                        <input type={"text"}
                                               onChange={(e)=>
                                               {this.setState({username:e.target.value})}} id={"uname"} >

                                        </input>
                                        <label htmlFor={"uname"}>Username:</label>

                                        <input type={"text"}
                                               onChange={(e)=>
                                               {this.setState({password:e.target.value})}}
                                               id={"pwd"}>

                                        </input>

                                        <label htmlFor={"pwd"}>Password:</label>
                                        <center>
                                            <button onClick={()=>this.login()}>LOGIN</button>
                                            <p> New User?  <BrowserRouter><Link compo>Sign Up</Link></BrowserRouter> </p>
                                        </center>
                                    </form>
                                </td>
                            </tr>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}