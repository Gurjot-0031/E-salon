import React from 'react';
import { useHistory } from 'react-router-dom';


function BookingConfirmation(props) {
    const history = useHistory();
    const redirectToHome = () =>{
        let path = '/home';
        history.push(path);
    }
    return (
        <div>
            <div><h3> Your appointment has been booked <br/></h3>
                <h4>Appointment details:-</h4>

                <h5>
                    <br/>
                    {
                        props.bookedSlot.startDateTime.toDateString() +"  "+
                        props.bookedSlot.startDateTime.toLocaleTimeString()+"  "
                    }
                        to
                        {"  "+props.bookedSlot.endDateTime.toLocaleTimeString()}
                </h5>
                <div align={'center'}>
                    <div>you can cancel or update your booking in MyAccount</div>
                    <button
                        className='btn-large'
                        onClick={redirectToHome}
                    >Go to home</button>
                </div>
            </div>


        </div>
    );
}

export default BookingConfirmation;