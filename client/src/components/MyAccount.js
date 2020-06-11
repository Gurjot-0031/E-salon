import React, {Component} from 'react';
import AppHeader from "./AppHeader";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    componentDidMount(){

    }


    render(){
        return (
            <div>
                <AppHeader/>
                <div className='table-of-contents'>
                    <div>Name: {localStorage.getItem("logg")}</div>
                </div>

            </div>
        );
    }
}

export default MyAccount;