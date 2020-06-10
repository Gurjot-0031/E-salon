import React, {Component} from 'react';
import AppHeader from "./AppHeader";
import 'react-datepicker/dist/react-datepicker.css';
import SchedulePicker from "./SchedulePicker";

export  default class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state={
            totalCost:this.props.location.state.selectedProducts
                .map(item=>item.price)
                .reduce((item1Price,item2Price)=>item1Price+item2Price,0),
            totalTime: this.props.location.state.selectedProducts
                .map(item=>item.estimatedTime)
                .reduce((item1Time,item2Time)=>item1Time+item2Time,0),
            items:this.props.location.state.selectedProducts,
            redirectToSchedulePicker : false
        }
        this.goToSchedulePicker = this.goToSchedulePicker.bind(this);
    }
     componentDidMount() {
    }

    removeItem(passedItem){
        this.setState(prevState=>(
            {
                totalCost: (prevState.totalCost - passedItem.price),
                totalTime: (prevState.totalTime - passedItem.estimatedTime),
                items: prevState.items.filter(item => (item.id !== passedItem.id))
            }
        ))
    }

    render() {
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
                            <button onClick={() => this.goToSchedulePicker()}>
                                NEXT
                            </button>
                            {/*<div className={"col s12"}>*/}
                            {/*    /!*{this.state.alreadyBooked.map(i=><p>{i.startDateTime}</p>)}*!/*/}
                            {/*    <SchedulePicker*/}
                            {/*        passedState = {this.state}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>

                    </div>
                    :null
                }
                {
                    (this.state.items.length!=0 && this.state.redirectToSchedulePicker)
                    ?
                       <div className={'row schedulePicker'}>
                           <div className={"col s12"}>
                               {/*{this.state.alreadyBooked.map(i=><p>{i.startDateTime}</p>)}*/}
                               <SchedulePicker
                                   passedState = {this.state}
                               />
                           </div>
                       </div>

                        :null


                }

            </div>
        );
    }

    goToSchedulePicker() {
        this.setState(prevState=>({   ...prevState,
             redirectToSchedulePicker: !prevState.redirectToSchedulePicker
         }))
    }
}