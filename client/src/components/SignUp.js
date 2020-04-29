import React from "react";

function SignUp() {
    let st = {
        //backgroundImage: url("/pics/loginBack.jpg"),
        backgroundColor: "#b2c4bd"
    }
    return(
        <div style={st}>
            <div className="table-of-contents " >
                <div className="row">
                    <div className="col s4 offset-s4">
                        <th className="center"><h4>E-Salon</h4></th>
                        <tr>
                            <td>
                                <form >
                                    <input type={"text"} id={"fname"} ></input>
                                    <label htmlFor={"uname"}>First Name:</label>

                                    <input type={"text"} id={"lname"} ></input>
                                    <label htmlFor={"uname"}>Last Name:</label>

                                    <input type={"text"} id={"uname"} ></input>
                                    <label htmlFor={"uname"}>Username:</label>

                                    <input type={"text"} id={"pwd"} ></input>
                                    <label htmlFor={"pwd"}>Password:</label>

                                    <input type={"text"} id={"cpwd"} ></input>
                                    <label htmlFor={"pwd"}>Confirm Password:</label>

                                    <center>
                                        <button type={"submit"} >Sign Up</button>
                                    </center>
                                </form>
                            </td>
                        </tr>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;