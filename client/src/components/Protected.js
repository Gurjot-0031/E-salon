import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
function Protected(props){
    let Comp = props.cmp;
    let auth = localStorage.getItem("isLoggedIn");
    console.warn("Protected Auth: "+localStorage.getItem("isLoggedIn"));

    // if(localStorage.getItem("isLoggedIn")){
    //     console.log("Going to products "+localStorage.getItem("isLoggedIn"));
    //     return <comp/>;
    // }
    //
    // else{
    //     console.log("Redirecting to login "+localStorage.getItem("isLoggedIn"));
    //     return <Redirect to="login"></Redirect>;
    // }
    return <div>
        { auth ? <Comp /> : <Redirect to="login"></Redirect>}
           </div>
}
export default Protected;