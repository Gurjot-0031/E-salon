import React, {Component} from 'react';

export  default class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state={
            totalCost:0,
            totalTime:0
        }
    }
    render() {
        console.log("TESTING<msnkdfodkfjngd")
        console.log(this.state.totalCost)
        console.log(this.state.totalTime)
        //console.log(this.props.location.state.selectedProducts);
        return (
            <div>
                <h1>BOOKINGS>>....dfjg</h1>
                <p>HEMLOdkjfdhnbf</p>
                {this.props.selectedProducts.map(item=>(
                    <div> {item.name} </div>
                ))}
            </div>
        );
    }
}
