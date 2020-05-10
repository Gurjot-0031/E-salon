import React,{Component} from "react";
import {Link, Redirect} from "react-router-dom";

class AppHeader extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn:localStorage.getItem("isLoggedIn")
        }
    }

    doLogout() {
        localStorage.clear()
        this.setState({isLoggedIn:false});
        //alert("You have been successfully logged out");
    }

    componentDidMount() {
        if(!this.state.isLoggedIn)
            return <Redirect to="/" />
        else
            return <Redirect to="/home" />
    }


    render(){
        const date = new Date()
        const hours = date.getHours()
        let timeOfDay

        if (hours < 12) {
            timeOfDay = "Morning"
        } else if (hours >= 12 && hours < 17) {
            timeOfDay = "Afternoon"
        } else {
            timeOfDay = "Evening"
        }

        const styles={
            color: "#181b34",
            backgroundColor: "#ff9b99",
            fontSize: "24px"
        }
    return(
        <div>
            {/*<header style={styles}> Good {timeOfDay}</header>*/}
            <div className="navbar-fixed" style={styles}>
                <nav>
                    <div className="nav-wrapper">
                        {/*<a href="#" className="left brand-logo" >E-Salon</a>*/}
                        <div className="brand-logo" ><Link to="home">E-Salon</Link> </div>
                        <ul id="nav-mobile">
                            {
                                localStorage.getItem("isLoggedIn")?
                                    <li className="left"><i>Good {timeOfDay} {localStorage.getItem("loggedUsername")}</i></li>
                                    : null

                            }
                            <li className="right "><a href="facebook.com"><i className="material-icons">account_circle</i></a></li>
                            <li className="right "><a href="instagram.com"><i className="material-icons">shopping_cart</i></a></li>
                            {
                                !localStorage.getItem("isLoggedIn")
                                    // ? <li className="right "><Link to="/logout"><i className="material-icons">power_settings_new</i></Link></li>
                                    // : <li className="right "><Link to="/"><i className="material-icons">power_settings_new</i></Link></li>
                                    ? <li className="right "><Link to="/login"><i className="material-icons">LOGIN</i></Link></li>
                                    : <li className="right "><i className="material-icons" onClick={this.doLogout.bind(this)}>LOGOUT</i></li>
                            }



                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

}

export default AppHeader;