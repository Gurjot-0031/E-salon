import React from "react";
import SingleProduct from "./SingleProduct";

function AppFooter() {
    const styles={
        color: "#181b34",
        backgroundColor: "#ff5658",
        fontSize: "24px"
    }
    return(
        <div>
        {/*<header style={styles}> Good {timeOfDay}</header>*/}
            <div className="fixed-action-btn">
                <button className="btn-large waves-ripple " style={styles}>BOOK</button>
            </div>
        </div>


    )
}

export default AppFooter;
