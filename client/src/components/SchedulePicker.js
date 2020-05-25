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

        //showing 9 days in future
        for (let i = 0; i < 8; i++) {
            temp.push(new Date(thisYear,thisMonth,dateToday+i));
        }

        let totalTimeSlots = []
        for (let hour = 9,min = 0; hour <= 17; min+=15) {
            if(min === 60)
                {
                    min = 0;
                    hour++;
                }
            totalTimeSlots.push(new Date(
                this.state.selectedYear,
                this.state.selectedMonth,
                this.state.selectedDate,
                hour,min
            ))
        }

        // let availableTimeSlots = totalTimeSlots
        //     .filter(i => )




        return (
            <div className={"row"}>
                {this.state.alreadyBooked
                    .map(i=><p>{i.startDateTime} to {i.endDateTime}</p>)}
                {
                    temp.map(item =>
                        <button className="col s3"
                                onClick={e => (this.showAvailabilities(item,e))}>
                            {item.getDate() +"-"+ monthNames[item.getMonth()]}
                        </button>
                    )
                }
                {(this.state.selectedDate)
                    ? <div>
                        <div>Slots for{" "+this.state.selectedDate +"-"+ monthNames[this.state.selectedMonth]}</div>
                        <div className='col s4'>
                            {totalTimeSlots.map(slot=>
                                <div className="row">
                                    {slot.getHours() }:{ slot.getMinutes()+' '}
                                    to{' '}
                                    { parseInt((slot.getHours()*60 + slot.getMinutes() + this.state.totalServiceTime)/60)}
                                    : {(slot.getHours()*60 + slot.getMinutes() + this.state.totalServiceTime)%60}
                                </div>)
                            }
                        </div>
                        <div className='col s4'>
                            {totalTimeSlots.map(slot=>
                                <div className='row'><button>SELECT</button></div>)
                            }
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}