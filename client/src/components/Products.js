import React, {Component} from "react";
import SingleProduct from "./SingleProduct";

export default class Products extends Component{
    constructor(props) {
        super(props);
        this.state={
            products:[],
            selectedProducts: []
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(id){
        let buttonElement = document.getElementById("toggle"+id);
        if(document.getElementById("toggle"+id).innerHTML=="ADD"){
            this.state.selectedProducts.
            push(this.state.products.find(item=>item.id===id))


            buttonElement.innerHTML="REMOVE";
            buttonElement.style.backgroundColor="red"
        }
        else if(document.getElementById("toggle"+id).innerHTML=="REMOVE"){
            //Removing the element
            this.state.selectedProducts=
            this.state.selectedProducts.filter(item=>item.id!==id)

            buttonElement.innerHTML="ADD";
            buttonElement.style.backgroundColor="green"

        }
        console.log(this.state.selectedProducts)

    }
    componentDidMount() {
        fetch("http://localhost:8080/rest/products/all")
            .then(response=>response.json())
            .then(data=>this.setState({products:data}));
    }

    render() {
        let st={
            color:"#813937",
            backgroundColor: "#b2c4bd",
            height:"10%"
        }
        return (
            <div>
                {/*<div><p>E-Salon</p></div>*/}
                <div style={st}>
                    <div className="nav-title" >
                        <nav style={st}>
                            <div className="row">
                                <div className="left-align col s12"><h5>Choose from wide variety of services we offer </h5></div>

                            </div>
                        </nav>
                    </div>
                    {this.state.products.map((item)=>(
                        <SingleProduct key={item.id} item={item}
                        handleToggle={this.handleToggle}/>
                    ))}
                </div>
            </div>
        )
    }
}