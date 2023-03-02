import React,{Component,Fragment} from 'react';
// import $ from "jquery";
import {Link} from 'react-router-dom';
import convertToMoney from './../../utils/convertMoney'
// import Cart from './Cart';
class DetailProductBill extends Component {

    onChange=(event)=>
    {
        var target=event.target;
       // var name=target.name;
        var value=target.value;
        const {cartItem}=this.props;
        cartItem.size=value;
        this.props.onUpdateProductToCart(cartItem);


    }
    onDeleteProductToCart(cartItem){
        this.props.onDeleteProductToCart(cartItem);
    }
    UpdateQuantity(cartItem, quantity){
        cartItem.quantity+=quantity;
        if(cartItem.inventory<cartItem.quantity){
            cartItem.quantity=cartItem.inventory;
        }
        cartItem.quantity=cartItem.quantity>0?cartItem.quantity:1;
        if(cartItem.inventory===0){
            cartItem.quantity=0;
        }
        this.props.onUpdateProductToCart(cartItem);
    }
    renderOption=(options)=>{
        var result=null;
        result=options.map((item,index)=>{
            return <option value={item.size} key={index}>{item.size}</option>
        })
        return result;
    }
  render(){
     const    {product}=this.props;
    // var {quantity, inventory,size,options}=cartItem;
    return (
       
        <Fragment>
            <tr className="wow fadeInUpBig" data-wow-duration="2s">
                <th scope="row">
                    <Link to={"#"} >
                        <img src={`${process.env.REACT_APP_API_URL}${product.image}`}
                            alt="" className=" z-depth-0"  style={{width:100}}/>
                    </Link>
                </th>
                <td>
                    <h5>
                        <strong>{product.name}</strong>
                    </h5>
                </td>
                <td >
                <span>S</span>
                </td>
                <td>{convertToMoney(product.price)} VND</td>
                <td className="center-on-small-only">
                    <span className="qty">{product.quantity}</span>
                </td>
                <td>{convertToMoney(product.price*product.quantity)}VND</td>
            </tr>
        </Fragment>
        
    );
  }
  
}


export default  DetailProductBill;
