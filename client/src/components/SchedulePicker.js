import React from 'react';
import {Component} from 'react';
import BookingConfirmation from './BookingConfirmation';

export default class SchedulePicker extends Component{
    constructor(props) {
        super(props);
        this.state={
            totalServiceTime: props.passedState.totalTime,
            alreadyBooked: [],
            selectedDate:'',
            selectedMonth:'',
            selectedYear:'',
            isBooked:false,
            bookedSlot:'',
        }
        this.showAvailabilities = this.showAvailabilities.bind(this);
        this.bookSchedule = this.bookSchedule.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/bookings/all",
            {  method:"GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response=>response.json())
            .then(data=>this.setState({alreadyBooked:data.map(i=>{
                    return {
                        startDateTime:new Date(i.startDateTime),
                            endDateTime:new Date(i.endDateTime)
                    }
                })}));

    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        //when the user removes an item in the parent component, service time changes there,,
        // which should also reflect in the child(schedule picker component)
        if(prevProps != this.props){
            this.setState({totalServiceTime: this.props.passedState.totalTime})
        }
    }

    showAvailabilities(item) {
        this.setState(prevState => (
                {
                    totalServiceTime: prevState.totalServiceTime,
                    alreadyBooked:prevState.alreadyBooked,
                    selectedDate: item.getDate(),
                    selectedMonth: item.getMonth(),
                    selectedYear: item.getFullYear(),
                    start:"45",
                    end:"56"

                }
            )
            )
    }
    render(){
        let temp = [];
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let today = new Date()

        let dateToday = today.getDate();
        let thisMonth = today.getMonth();
        let thisYear = today.getFullYear();

        //showing 6 days in future
        for (let i = 1; i < 7; i++) {
            temp = [...temp ,new Date(thisYear,thisMonth,dateToday+i)];
        }

        let totalTimeSlots = []
        for (let hour = 9,min = 0; hour <= 17; min+=15) {
            if(min === 60)
                {
                    min = 0;
                    hour++;
                }
            if((hour*60 + min + this.state.totalServiceTime)/60 <= 18){
                totalTimeSlots = [...totalTimeSlots , {
                    startDateTime: new Date(
                        this.state.selectedYear,
                        this.state.selectedMonth,
                        this.state.selectedDate,
                        hour,min
                    ),
                    endDateTime: new Date(
                        this.state.selectedYear,
                        this.state.selectedMonth,
                        this.state.selectedDate,
                        parseInt((hour*60 + min + this.state.totalServiceTime)/60),         //hours
                        (hour*60 + min + this.state.totalServiceTime)%60                       //minutes
                    )
                }]
            }

        }

        console.log("Already Booked\n"+ this.state.alreadyBooked.map(i => i.startDateTime+"\n"))
        let selectedDayAlreadyBookedSlots =[]
        if(this.state.selectedDate){
            selectedDayAlreadyBookedSlots = this.state.alreadyBooked
                .filter(i=>{
                    console.log(i.startDateTime.getDate() + '   '+ this.state.selectedDate)
                    if(i.startDateTime === null || i.startDateTime === undefined)
                        return null
                    else if((i.startDateTime.getDate() == this.state.selectedDate)){
                        console.log(i.startDateTime.getDate() + '   '+ this.state.selectedDate)
                        return i
                    }
                    //return ;
                })
        }

        function isClear(i) {
            for (let j = 0; j < selectedDayAlreadyBookedSlots.length; j++) {
                // console.log(i.startDateTime);
                // console.log(selectedDayAlreadyBookedSlots[j].startDateTime)
                if(i.endDateTime.getTime() <= selectedDayAlreadyBookedSlots[j].endDateTime.getTime()
                    && i.endDateTime.getTime() > selectedDayAlreadyBookedSlots[j].startDateTime.getTime()){
                    return false;
                }
                if(i.startDateTime.getTime() >= selectedDayAlreadyBookedSlots[j].startDateTime.getTime()
                    && i.startDateTime.getTime() < selectedDayAlreadyBookedSlots[j].endDateTime.getTime()) {
                    return false;
                }
            }
            return true;
        }

        let availableTimeSlots
        console.log("TEST"+selectedDayAlreadyBookedSlots.length);
        if(selectedDayAlreadyBookedSlots.length!=0)
            availableTimeSlots = totalTimeSlots.filter(i => (isClear(i)) ? i : console.log("Kicked out:"+i.startDateTime+" to "+i.endDateTime))
        else availableTimeSlots = totalTimeSlots

        return (
            <div>
                {
                    (!this.state.isBooked)
                        ?
                        <table>
                            <thead>
                                <th className={'titleHeader'} colSpan={6}>Pick a slot</th>
                            </thead>

                            <tbody>
                                <tr>
                                    {temp.map(item =>
                                        <td className='col s2 generalTheme'>
                                            <button className="btn-small"
                                                // style={{'padding':'15%','margin':'15%', 'width':'150%', 'height':'70%'}}
                                                    onClick={e => (this.showAvailabilities(item,e))}>
                                                {item.getDate() +"-"+ monthNames[item.getMonth()]}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                        :
                        null
                }
                {(this.state.selectedDate && !this.state.isBooked)
                    ? <div>
                        <table >
                            <thead >
                                <th>
                                    Available Slots for{" "+this.state.selectedDate +"-"+ monthNames[this.state.selectedMonth]}
                                </th>
                            </thead>
                            <tbody>
                                {availableTimeSlots.map(slot=>
                                        <tr>
                                            <td>
                                                <button className='slotButton btn-small '
                                                        onClick={e=>this.bookSchedule(slot,e)}
                                                >
                                                    {slot.startDateTime.getHours() }:{ slot.startDateTime.getMinutes()+' '}
                                                    -{' '}
                                                    { slot.endDateTime.getHours()}
                                                    : {slot.endDateTime.getMinutes()}
                                                </button>
                                            </td>
                                        </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                    : (this.state.isBooked) ? <BookingConfirmation bookedSlot={this.state.bookedSlot}/>
                                            : null }
            </div>
        );
    }

    bookSchedule(slot, e) {
        console.log(slot.startDateTime.toString());
        console.log(slot.endDateTime.toString());
        console.log(localStorage.getItem("loggedUserId"));
        fetch("http://localhost:8080/rest/bookings/addBooking",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({startDateTime: slot.startDateTime, endDateTime: slot.endDateTime ,uidInBooking: localStorage.getItem("loggedUserId")})
            }).then(result => result.json())
            .then(parsedResp => {
                console.log("Booking response from API "+parsedResp);
                if(parsedResp === true){
                    this.setState(prevState => (
                        {
                            ...prevState,
                            isBooked : !prevState.isBooked,
                            bookedSlot: slot
                        }
                    ))
                }
            })
    }
}