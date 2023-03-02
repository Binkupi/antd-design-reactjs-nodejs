import React,{Component,Fragment} from 'react';
import Sort from './../components/Sort'
import {connect} from 'react-redux'
import * as actions from './../actions/index'
class SortContainer extends Component {
  render(){
    return (
        <Fragment >
            <Sort onSort={this.props.onSort}/>
        </Fragment>
        
    );
  }
  
}
const mapStateToProps = (state)=>{
  return{
      keyword:state.Sort,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
        onSort:(status)=>{
          dispatch(actions.onSort(status));
      }
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(SortContainer);
