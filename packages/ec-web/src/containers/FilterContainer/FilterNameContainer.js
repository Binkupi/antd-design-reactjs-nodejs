import React,{Component,Fragment} from 'react';
import FilterName from '../../components/Filter/FilterName'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'
class FilterNameContainer extends Component {
  render(){
    return (
        <Fragment >
            <FilterName onSearch={this.props.onSearch}
            history={this.props.history}/>
        </Fragment>
        
    );
  }
  
}
const mapStateToProps = (state)=>{
  return{
      keyword:state.FiterName,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
        onSearch:(keyword)=>{
          dispatch(actions.onSearch(keyword));
      }
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(FilterNameContainer);
