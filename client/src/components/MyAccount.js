import React, {Component} from 'react';
import AppHeader from "./AppHeader";
import  "../App.css";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editname :false,
            editemail :false,
            editphone :false,
            myBookings :[]
        };
        //this.edit = this.edit.bind(this);

    }
     componentDidMount(){
         fetch("http://localhost:8080/rest/users/getUserDetails", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: JSON.stringify({username : localStorage.getItem("loggedUsername")})
        })
            .then(response => response.json())
            .then(result => {
                //console.log("setting UID: "+result.uid);
                this.setState({
                    uid: result.uid,
                    username: result.username,
                    name: result.name,
                    email: result.email,
                    phone: result.phone
                })
            })

         fetch("http://localhost:8080/rest/users/getAllBookings", {
             method: 'POST', // *GET, POST, PUT, DELETE, etc.
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': '*/*',
             },
             body: JSON.stringify({username : localStorage.getItem("loggedUsername")})
         })
             .then(response => response.json())
             .then(result =>
                 //console.log("setting UID: "+result.uid);
                 this.setState({
                     myBookings: result
                 })
             )


    }
    render(){
        return (
            <div>
                <AppHeader/>
                <h4><div align='center'>My Details</div></h4>
                <table className='MyAccountTable '>
                    <tbody>
                    {
                        Object.keys(this.state)
                            .filter(i => !i.startsWith('edit') && !i.startsWith('myBookings'))
                            .map(i =>
                                <tr key={i}>
                                    <td className='col s2 '>{[i]}</td>
                                    {(!this.state['edit'+[i]])
                                        ?<td className='col s3' >{this.state[i]}</td>
                                        :<td className='col s3'>
                                            <input rows="1" cols="10" name={[i]}
                                                   onChange={(e)=>this.handleChange(e)}
                                                   value={this.state[[i]]}
                                                   style={{'resize':'none'}}
                                                // placeholder={'enter new value'}
                                            />
                                        </td>
                                    }

                                    {[i] == 'uid' || [i] == 'username' ?
                                        null
                                        :
                                        (this.state['edit'+[i]])
                                            ?<td className='col s1'>
                                                <button className='material-icons'
                                                        onClick={()=>this.handleDone(i)}>
                                                    done
                                                </button>
                                            </td>
                                            :<td className='col s1'>
                                                <button className='material-icons'
                                                        onClick={()=>this.handleEdit(i)}>
                                                    edit
                                                </button>
                                            </td>
                                    }
                                </tr>
                            )
                    }
                    </tbody>
                </table>
                <h4><div align='center'>My Bookings</div></h4>
                <table className={'MyBookingsTable'}>
                    <thead>
                        <th>Date</th>
                        <th>Starts</th>
                        <th>Ends</th>
                        <th>Status</th>
                    </thead>
                    <tbody>

                        {this.state.myBookings
                            .map(bookingObject =>
                                    <tr>
                                        {React.createElement('td',null,new Date(bookingObject.startDateTime).toDateString())}
                                        {React.createElement('td',null, new Date(bookingObject.startDateTime).toLocaleTimeString())}
                                        {React.createElement('td',null,new Date(bookingObject.endDateTime).toLocaleTimeString())}
                                        <td>{(new Date().getTime() < new Date(bookingObject.startDateTime).getTime())
                                            ? "Upcoming"
                                            : "Completed"
                                        }</td>
                                    </tr>
                        )}
                    </tbody>
                </table>

            </div>
        );
    }

    handleEdit(element) {
        const x = "edit" + [element];
        this.setState(prevState=>({
            [x]: !prevState[x],
        }))
        //console.log("HENLO "+this.state.editname);
        //document.getElementById('text-'+[element]).hidden = false;
        //alert([element]+"  "+this.state[element])
    }


    handleDone(element) {
        fetch("http://localhost:8080/rest/users/updateUser",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'uid':this.state.uid,
                'username':this.state.username,
                'name':this.state.name,
                'email':this.state.email,
                'phone':this.state.phone
            })
        })
            .then(response => response.json())
            .then(result =>{
                if(result === false)
                    alert("User can't be updated")

            })
        const x = "edit" + [element];
        this.setState(prevState=>({
            [x]: !prevState[x],
        }))
    }
    handleChange(event) {
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    }
}

export default MyAccount;