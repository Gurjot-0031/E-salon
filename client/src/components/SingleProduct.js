import React from 'react';

function SingleProduct(props) {
    return(
        <div className={'productTile'}>
            {/*className="z-depth-5"*/}

            <div className="row z-depth-3" >
                {/*<div className="divider"/>*/}
                <div className="section center-block">
                    <div className=" col s4 " >
                        {/*<img src={"pics/hair_straightening.jpg"} width={80} height={60}/>*/}
                        <img src={props.item.imagePath} height={"50%"} width={"75%"} />
                    </div>

                    <div className="left-align col s5 ">
                        <h5>{props.item.name}</h5>
                        <p>{props.item.description}</p>
                        <p>Esimated time- {props.item.estimatedTime} minutes</p>
                        <p>Our Price- ${props.item.price}</p>
                    </div>

                    <div className="col s2 "><br/>
                        <button className={"btn-small waves-teal"}
                                id={"toggle"+props.item.id}
                                onClick={()=>props.handleToggle(props.item.id)}
                        style={{backgroundColor:"green",width: "90%",height:"10%"}}>ADD</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;