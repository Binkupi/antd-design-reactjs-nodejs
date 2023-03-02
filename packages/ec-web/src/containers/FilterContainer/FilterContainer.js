import React,{Component,Fragment} from 'react';
import FilterCatagory from '../../components/Filter/Filter';

class FilterContainer extends Component {
  render(){
    return (
        <Fragment >
            <FilterCatagory onSearch={this.props.onSearch}/>
        </Fragment>
        
    );
  }
  
}

export default FilterContainer;
