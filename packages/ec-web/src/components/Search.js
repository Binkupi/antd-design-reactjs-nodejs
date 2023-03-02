import React,{Component,Fragment} from 'react';
import $ from "jquery";
class Search extends Component {
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
        // console.log(history);
        // this.props.onSearch(this.state.keyword);
        var url=history.location.pathname;
        $('.search-model').fadeOut(400, function () {
            
        });
        if((url==='/')){
            history.replace(`?search=${this.state.keyword}`)
        }else{
            history.replace(`/shop/search?value=${this.state.keyword}`)
        }
        
    }
  render(){
    const    {keyword}=this.state;
    return (
        <Fragment>
            {/* <!-- Search Begin --> */}
            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">+</div>
                    <form className="search-model-form" onSubmit={this.onSubmit}>
                        <input type="text" id="search-input"
                         placeholder="Tìm kiếm tại đây ..."
                          name="keyword" value={keyword} 
                          onChange={this.onChange}/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary"
                                type="submit"
                                >
                                <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                        </span>
                    </form>
                </div>
            </div>
            {/* <!-- Search End --> */}
        </Fragment>
        
    );
  }
  
}


export default Search;
