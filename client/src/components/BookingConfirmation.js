import React from 'react';

function BookingConfirmation(props) {
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
            </div>
        </div>
    );
}

export default BookingConfirmation;