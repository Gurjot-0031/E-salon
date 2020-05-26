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
            .then(data=>this.setState({alreadyBooked:data}));
    }
    showAvailabilities(item) {
        //alert("sdkfbgl")
        this.setState(prevState => (
                {
                    totalServiceTime: prevState.totalServiceTime,
                    booked:prevState.booked,
                    selectedDate: item.getDate(),
                    selectedMonth: item.getMonth(),
                    selectedYear: item.getYear(),
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

        let today = new Date();
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
                start: new Date(
                    this.state.selectedYear,
                    this.state.selectedMonth,
                    this.state.selectedDate,
                    hour,min
                ),
                end: new Date(
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
                    if(i.startDateTime === null || i.startDateTime === undefined)
                        return null
                    else if((i.startDateTime.substr(8,2) == this.state.selectedDate)){
                        console.log(i.startDateTime.substr(8,2) + '   '+ this.state.selectedDate)
                        return i
                    }
                })
        }

        function isClear(i) {
            for (let j = 0; j < selectedDayAlreadyBookedSlots.length; j++) {
                if(i.end.getHours() < selectedDayAlreadyBookedSlots[j].startDateTime.substr(11,2)
                    || i.start.getHours() > selectedDayAlreadyBookedSlots[j].endDateTime.substr(11,2)){
                    return true;
                }
                if(i.end.getHours() == selectedDayAlreadyBookedSlots[j].startDateTime.substr(11,2)
                    && i.end.getMinutes() == selectedDayAlreadyBookedSlots[j].startDateTime.substr(14,2)) {
                    return true;
                }
                if(i.start.getHours() == selectedDayAlreadyBookedSlots[j].endDateTime.substr(11,2)
                    && i.start.getMinutes() == selectedDayAlreadyBookedSlots[j].endDateTime.substr(14,2)) {
                    return true;
                }
            }
            return false;
        }

        let availableTimeSlots
        if(selectedDayAlreadyBookedSlots.length!=0)
            availableTimeSlots = totalTimeSlots.filter(i => (isClear(i)) ? i : null)
        else availableTimeSlots = totalTimeSlots

        return (
            <div>
                {selectedDayAlreadyBookedSlots
                    .map(i=><p>{i.startDateTime} to {i.endDateTime}</p>)}
                {
                    <div className={'col s1'}>
                        {temp.map(item =>
                            <button className="row"
                                    style={{'padding':'6px','margin':'6px'}}
                                    onClick={e => (this.showAvailabilities(item,e))}>
                                {item.getDate() +"-"+ monthNames[item.getMonth()]}
                            </button>
                        )}
                    </div>
                }
                {(this.state.selectedDate)
                    ? <div>
                        <div className='col s6 offset-s2'>
                            <div className={'row'} style={{'padding':'20px'}}>
                                <h5>
                                    Available Slots for{" "+this.state.selectedDate +"-"+ monthNames[this.state.selectedMonth]}
                                </h5>
                            </div>
                            {availableTimeSlots.map(slot=>
                                    <div className={'row'}>
                                        <div className={'col s4'}>
                                            {slot.start.getHours() }:{ slot.start.getMinutes()+' '}
                                            to{' '}
                                            { slot.end.getHours()}
                                            : {slot.end.getMinutes()}
                                        </div>
                                        <div className={'col s2'}>
                                            <button>CHOOSE</button>
                                        </div>
                                    </div>)
                            }
                        </div>
                        {/*<div className='col s4'>*/}
                        {/*    {availableTimeSlots.map(slot=>*/}
                        {/*        <div className='row'><button>CHOOSE</button></div>)*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                    : null}
            </div>
        );
    }
}