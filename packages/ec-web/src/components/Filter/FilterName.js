import React,{Component,Fragment} from 'react';
// import {connect} from 'react-redux'
class FilterName extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            keyword:''
        }
    }
    onChange=(event)=>
    {
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.setState({
            [name]:value
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        var {history}=this.props;
            history.replace(`/shop/search?value=${this.state.keyword}`)
    }
  render(){
    const    {keyword}=this.state;
    return (
        <Fragment>
            {/* <!-- Filter Begin --> */}
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Tìm kiếm..." name="keyword" value={keyword} 
                          onChange={this.onChange}/>
                <button  type="submit"  ><span className="icon_search"></span></button>
            </form>
            {/* <!-- Filter End --> */}
        </Fragment>
        
    );
  }
  
}


export default FilterName;
