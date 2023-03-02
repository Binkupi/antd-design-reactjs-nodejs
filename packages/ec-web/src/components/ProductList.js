import React,{Component,Fragment} from 'react';

class ProductList extends Component {
  render(){
    const {children} = this.props;
    return (
        <Fragment>
            {children}
        </Fragment>
        
    );
  }
  
}

export default ProductList;
