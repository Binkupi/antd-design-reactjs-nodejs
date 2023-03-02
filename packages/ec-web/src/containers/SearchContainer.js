import React,{Component,Fragment} from 'react';
import Search from './../components/Search'
import {connect} from 'react-redux'
import * as actions from './../actions/index'
class SearchContainer extends Component {
  render(){
    return (
        <Fragment >
            <Search onSearch={this.props.onSearch}
                    history={this.props.history}/>
        </Fragment>
        
    );
  }
  
}
const mapStateToProps = (state)=>{
  return{
      keyword:state.search,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
        onSearch:(keyword)=>{
          dispatch(actions.onSearch(keyword));
      }
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(SearchContainer);
