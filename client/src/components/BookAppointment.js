import React, {Component} from 'react';
import AppHeader from "./AppHeader";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";
import MyDateTimePicker from "./MyDateTimePicker";

export  default class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state={
            alreadyBooked: [],
            totalCost:0,
            totalTime:0,
            items:this.props.location.state.selectedProducts
        }

        //this.removeItem = this.removeItem.bind(this);
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

        this.setState(prevState=>({
            totalCost: prevState.items.map(item=>item.price)
                .reduce((item1Price,item2Price)=>item1Price+item2Price,0),
            totalTime: prevState.items.map(item=>item.estimatedTime)
                .reduce((item1Time,item2Time)=>item1Time+item2Time,0),
            items:prevState.items
        }))
    }

    removeItem(passedItem){
        // console.log(passedItem);
        // console.log("HELO")
        this.setState(prevState=>(
            {
                totalCost: (prevState.totalCost - passedItem.price),
                totalTime: (prevState.totalTime - passedItem.estimatedTime),
                items: prevState.items.filter(item => (item.id !== passedItem.id))
            }
        ))
    }

    render() {

        // console.log(this.state.items);
        // console.log(this.state.totalCost)
        // console.log(this.state.totalTime)
        // console.log(this.props.location.state);

        return (
            <div>
                <AppHeader/>
               <div className="container">
                    <h5 className="left-align">Your selected services..</h5>
                   {(this.state.items.length !== 0)
                       ?<div className={"row"}>
                           <div className={"col s3"}>Service</div>
                           <div className={"col s3"}>Price</div>
                           <div className={"col s3"}>Estimated time</div>
                           <div className={"col s3"}>Remove</div>
                       </div>
                       :<div>Your booking cart is empty</div>
                   }
                    {this.state.items.map(item=>(
                        <div className={"row"} key={item.id}>
                            <div className={"col s3"}>
                                {item.name}
                            </div>
                            <div className={"col s3"}>
                                {item.price}
                            </div>
                            <div className={"col s3"}>
                                {item.estimatedTime}
                            </div>
                            <div className={"col s3"}>
                                {/*<i*/}
                                {/*    onClick={this.removeItem(item.id)}*/}
                                {/*   className="material-icons">delete</i>*/}
                                <button
                                    className="btn-small"
                                    onClick={()=>this.removeItem(item)}
                                    //onClick={this.removeItem({item})}
                                    >
                                    REMOVE
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
                {(this.state.items.length !== 0)
                    ?<div>
                        <div className={"row"}>
                            <div className={"col s6"}>Total price</div>
                            <div className={"col s2"}>${this.state.totalCost}</div>
                        </div>
                        <div className={"row"}>
                            <div className={"col s6"}>Total time</div>
                            <div className={"col s2"}>{this.state.totalTime} minutes</div>
                        </div>
                        <div className={"row schedulePicker"}>
                            <div className={"col s8"}>
                                <MyDateTimePicker alreadyBooked={this.state.alreadyBooked}/>
                            </div>
                            {/*<div className={"col s4"}>*/}
                            {/*    <MyDateTimePicker/>*/}
                            {/*</div>*/}
                            <button
                                className='btn-small'
                                onClick={this.doBooking.bind(this)}>
                                BOOK
                            </button>
                        </div>

                    </div>
                    :null
                }

            </div>
        );
    }
    doBooking() {

    }
}
