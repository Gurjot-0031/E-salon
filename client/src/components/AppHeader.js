import React from "react";
import {Link} from "react-router-dom";

function AppHeader() {
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
                                localStorage.getItem("loggedIn")?
                                <li className="left"><h6>Good {timeOfDay} {localStorage.getItem("loggedIn")}</h6></li>
                                :
                                null
                            }
                            <li className="right "><a href="facebook.com"><i className="material-icons">account_circle</i></a></li>
                            <li className="right "><a href="instagram.com"><i className="material-icons">shopping_cart</i></a></li>
                            <li className="right "><Link to="/"><i className="material-icons">vpn_key</i></Link></li>

                            {/*<Link to={"about"}>ABOUT</Link>*/}

                        </ul>
                    </div>
                </nav>
            </div>
        </div>



    )

}

export default AppHeader;