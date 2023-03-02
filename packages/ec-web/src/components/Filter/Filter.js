import React,{Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux'
// import $ from "jquery";
class Filter extends Component {
  render(){
    return (
        <Fragment>
            <ul className="nice-scroll">
                <li><Link type="button" to={`?catagory="men"`}>Clothing </Link></li>
                <li><Link type="button" to={`?catagory="Shoes"`}>Shoes</Link></li>
                <li><Link type="button" to={`?catagory="Accessories"`}>Accessories</Link></li>
            </ul>
        </Fragment>
        
    );
  }
  
}


export default Filter;

