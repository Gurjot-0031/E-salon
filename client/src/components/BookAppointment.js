import React, {Component} from 'react';
import AppHeader from "./AppHeader";

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
        console.log(this.props.location.state);
        return (
            <div>
                <AppHeader/>
                <h4>Your selected services..</h4>
                <div className="table-of-contents">
                    {this.props.location.state.selectedProducts.map(item=>(
                        <div key={item.id}> {item.name} </div>
                    ))}
                </div>
            </div>
        );
    }
}
