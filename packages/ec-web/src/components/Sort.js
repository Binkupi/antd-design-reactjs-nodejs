import React,{Component,Fragment} from 'react';
// import {connect} from 'react-redux'
// import $ from "jquery";
class Sort extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            status:0
        }
    }

    onChange=(event)=>
    {
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.props.onSort(value);
        this.setState({
            [name]:value
        });
        

    }
  render(){
    return (
        <Fragment>
            {/* <!-- Sort Begin --> */}
            <div className="shop__product__option__right">
                <p>Sắp xếp theo giá:</p>
                <select style={{width:'170px', fontSize:'15px'}} className="custom-select"
                     name='status' 
                     value={this.state.status}
                     onChange={this.onChange}>
                    <option value="0">-Sắp xếp-</option>
                    <option value="1">Thấp đến cao</option>
                    <option value="2">Cao đến thấp</option>
                    <option value="3">1-&gt;500.000VND</option>
                    <option value="4"> Trên 500.000VND</option>
                </select>
            </div>
            {/* <!-- Sort End --> */}
        </Fragment>
        
    );
  }
  
}


export default Sort;
