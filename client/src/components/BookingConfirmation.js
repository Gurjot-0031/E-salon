import React from 'react';

function BookingConfirmation(props) {
    return (
        <div>
            <div><h3> Your appointment has been booked </h3>
                <h4>
                    <br/>
                    {props.bookedSlot.startDateTime.toDateString()}
                    <br/>
                    Starts- {props.bookedSlot.startDateTime.toLocaleTimeString()}
                    <br/>
                    Ends- {props.bookedSlot.endDateTime.toLocaleTimeString()}
                </h4>
            </div>
        </div>
    );
}

export default BookingConfirmation;