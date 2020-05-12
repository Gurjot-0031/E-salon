import React, {Component} from 'react';
import AppHeader from "./AppHeader";

export  default class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state={
            totalCost:0,
            totalTime:0,
            items:this.props.location.state.selectedProducts
        }
        //this.removeItem = this.removeItem.bind(this);
    }
    removeItem(passedItem){
        console.log(passedItem);
        console.log("HELO")
        // this.setState(prevState=>(
        //     {
        //         totalCost: prevState.totalCost,
        //         totalTime: prevState.totalTime,
        //         items: prevState.items.filter(item => (item.id !== itemId))
        //     }
        // ))
        let newItems = this.state.items.filter(item => (item.id !== passedItem.id));
        //console.log(newItems);
        this.setState({items:newItems});
    }
    render() {
        console.log(this.state.items);
        // console.log(this.state.totalCost)
        // console.log(this.state.totalTime)
        // console.log(this.props.location.state);
        return (
            <div>
                <AppHeader/>
               <div className="container">
                    <h5 className="left-align">Your selected services..</h5>
                   <div className={"row"}>
                       <div className={"col s3"}>Service</div>
                       <div className={"col s3"}>Price</div>
                       <div className={"col s3"}>Estimated time</div>
                       <div className={"col s3"}>Remove</div>
                   </div>
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
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}
