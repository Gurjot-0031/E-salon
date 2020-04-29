import React from "react";

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
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="center brand-logo" >E-Salon</a>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li><a href="facebook.com"><i className="material-icons">account_circle</i></a></li>
                            <li><a href="instagram.com"><i className="material-icons">shopping_cart</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>



    )

}

export default AppHeader;