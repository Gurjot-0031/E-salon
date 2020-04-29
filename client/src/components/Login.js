import React, {Component} from "react";

function validateLogin() {
    return undefined;
}

export default class Login extends Component{
    render() {
        return(
            <form onSubmit={validateLogin()}>
                <label htmlFor={"name"}>Enter username:</label>
                <input type={"text"} id={"name"} />

                <label htmlFor={"password"}>Enter password:</label>
                <input type={"text"} id={"password"} />

                <button type={"submit"}>SUBMIT</button>
            </form>
        )
    }
}