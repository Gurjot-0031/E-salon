import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
function Protected(props){
    const Comp = props.cmp;
    var auth = localStorage.getItem("auth");
    console.warn(auth);
    return <div>
        {auth ? <Comp /> : <Redirect to="login"></Redirect>}
           </div>

}

export default Protected;