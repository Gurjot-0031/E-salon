import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
function Protected(props){
    let Comp = props.cmp;
    let auth = localStorage.getItem("isLoggedIn");

    return <div>
        { (auth === 'true') ? <Comp /> : <Redirect to="login"></Redirect>}
           </div>
}
export default Protected;