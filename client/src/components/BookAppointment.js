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
            <div className={'generalTheme'}>
                <AppHeader/>
                    {(this.state.items.length !== 0 && !this.state.redirectToSchedulePicker)
                       ?
                       <table className='MyBookingsTable'>
                            <thead>
                            <th colSpan={'4'} className='titleHeader' >Your selected services..</th>
                            </thead>
                            <thead>
                               <th className={"col s3"}>Service</th>
                               <th className={"col s3"}>Price</th>
                               <th className={"col s3"}>Estimated time</th>
                               <th className={"col s3"}>Remove</th>
                            </thead>
                       <tbody>
                        {this.state.items.map(item=>(
                           <tr key={item.id}>
                               <td className={"col s3"}>
                                   {item.name}
                               </td>
                               <td className={"col s3"}>
                                   {item.price}
                               </td>
                               <td className={"col s3"}>
                                   {item.estimatedTime}
                               </td>
                               <td className={"col s3"}>
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

                               </td>
                           </tr>
                           ))}
                           <tr>
                               <td colSpan={4}>Total price - ${this.state.totalCost}</td>
                           </tr>
                            <tr>
                                <td colSpan={4}>Total time - {this.state.totalTime} minutes</td>
                            </tr>
                            <tr>
                                <td colSpan={4} >
                                    <button
                                        className={'btn-large'}
                                        onClick={() => this.goToSchedulePicker()}>
                                        NEXT
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                       </table>
                       :(this.state.items.length === 0)? <div>Your booking cart is empty</div> : null
                   }


                {
                    (this.state.items.length!=0 && this.state.redirectToSchedulePicker)
                    ?
                        <SchedulePicker
                            passedState = {this.state}
                        />

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