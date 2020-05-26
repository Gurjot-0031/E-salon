import React, {useState} from 'react';
import {Component} from 'react';

export default class SchedulePicker extends Component{
    constructor(props) {
        super(props);
        this.state={
            totalServiceTime: props.passedState.totalTime,
            alreadyBooked: [],
            selectedDate:'',
            selectedMonth:'',
            selectedYear:'',
            start: '',
            end: ''
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

        //showing 11 days in future
        for (let i = 0; i < 10; i++) {
            temp.push(new Date(thisYear,thisMonth,dateToday+i));
        }

        let totalTimeSlots = []
        for (let hour = 9,min = 0; hour <= 17; min+=15) {
            if(min === 60)
                {
                    min = 0;
                    hour++;
                }
            totalTimeSlots.push({
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
            })
        }

        let selectedDayAlreadyBookedSlots =[]
        if(this.state.selectedDate){
            selectedDayAlreadyBookedSlots = this.state.alreadyBooked
                .filter(i=>{
                    //console.log(i.startDateTime.getDate() + '   '+ this.state.selectedDate)
                    if(i.startDateTime === null || i.startDateTime === undefined)
                        return null
                    else if((i.startDateTime.getDate() == this.state.selectedDate)){
                        console.log(i.startDateTime.getDate() + '   '+ this.state.selectedDate)
                        return i
                    }
                })
        }

        function isClear(i) {
            for (let j = 0; j < selectedDayAlreadyBookedSlots.length; j++) {

                console.log(i.startDateTime);
                console.log(selectedDayAlreadyBookedSlots[j].startDateTime)

                if(i.endDateTime.getHours() < selectedDayAlreadyBookedSlots[j].startDateTime.getHours()
                    || i.startDateTime.getHours() > selectedDayAlreadyBookedSlots[j].endDateTime.getHours()){
                    return true;
                }
                if(i.endDateTime.getHours() == selectedDayAlreadyBookedSlots[j].startDateTime.getHours()
                    && i.endDateTime.getMinutes() == selectedDayAlreadyBookedSlots[j].startDateTime.getMinutes()) {
                    return true;
                }
                if(i.startDateTime.getHours() == selectedDayAlreadyBookedSlots[j].endDateTime.getHours()
                    && i.startDateTime.getMinutes() == selectedDayAlreadyBookedSlots[j].endDateTime.getMinutes()) {
                    return true;
                }
                if(i.startDateTime == selectedDayAlreadyBookedSlots[j].startDateTime
                    && i.endDateTime == selectedDayAlreadyBookedSlots[j].endDateTime){

                    return false;
                }

            }
            return false;
        }

        let availableTimeSlots
        console.log("TEST"+selectedDayAlreadyBookedSlots.length);
        if(selectedDayAlreadyBookedSlots.length!=0)
            availableTimeSlots = totalTimeSlots.filter(i => (isClear(i)) ? i : null)
        else availableTimeSlots = totalTimeSlots

        return (
            <div>
                {/*{selectedDayAlreadyBookedSlots*/}
                {/*    .map(i=>{ return <p>{i.startDateTime} to {i.endDateTime}</p>})}*/}
                {
                    <div className={'col s1'}>
                        {temp.map(item =>
                            <button className="btn row"
                                    style={{'padding':'15%','margin':'15%', 'width':'150%', 'height':'70%'}}
                                    onClick={e => (this.showAvailabilities(item,e))}>
                                {item.getDate() +"-"+ monthNames[item.getMonth()]}
                            </button>
                        )}
                    </div>
                }
                {(this.state.selectedDate)
                    ? <div>
                        <div className='col s8 offset-s2'>
                            <div className={'row'} style={{'padding':'5% 5% 5% 5%'}}>
                                <h5>
                                    Available Slots for{" "+this.state.selectedDate +"-"+ monthNames[this.state.selectedMonth]}
                                </h5>
                            </div>
                            {availableTimeSlots.map(slot=>
                                    <div className={'col s3'}>
                                        <div className={'row '}>
                                            <button className='slotButton btn-small '
                                                onClick={e=>this.bookSchedule(slot,e)}
                                                >
                                                {slot.startDateTime.getHours() }:{ slot.startDateTime.getMinutes()+' '}
                                                -{' '}
                                                { slot.endDateTime.getHours()}
                                                : {slot.endDateTime.getMinutes()}
                                            </button>
                                        </div>

                                    </div>)
                            }
                        </div>
                    </div>
                    : null}
            </div>
        );
    }

    bookSchedule(slot, e) {
        console.log(slot.startDateTime.toString());
        console.log(slot.endDateTime.toString());
        fetch("http://localhost:8080/rest/bookings/addBooking",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(slot)
            }).then(result => result.json())
            .then(parsedResp => {
                console.log(parsedResp);
                //localStorage.setItem("isLoggedIn",parsedResp.isSuccess);
                //localStorage.setItem("loggedUsername",parsedResp.username);
                //this.setState({username:parsedResp.username})
                //this.setState({isLoggedIn:parsedResp.isSuccess})
            })
    }
}