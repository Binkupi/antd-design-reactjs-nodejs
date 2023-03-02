import React, { Component } from 'react';
// import $ from 'jquery'
import WOW from 'wowjs'
class SD_Pictures extends Component { 
    constructor(props)
    {
        super(props);
        this.state={
            images:[]
        }
    }
    componentDidMount() {

        var {images} = this.props;
        this.setState({
            images:images
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.images!==this.props.images){

        }
    }
    render() {
        var {images} = this.props;
        if (images) {
            var navItem = images.map((image,i) => 
                <li className="nav-item" key={i}> 
                    <a  className= { i === 0 ? "nav-link active" : "nav-link" } 
                        data-toggle="tab" 
                        href={"#tabs-"+(i+1)} 
                        role="tab"
                    >
                        <div 
                            className="product__thumb__pic set_bg" 
                            data-setbg={process.env.REACT_APP_API_URL + image} 
                            key={i}
                            style={{backgroundImage: "url("+process.env.REACT_APP_API_URL + image+")"}}
                        >
                        </div>
                    </a>
                </li>
            )
            var tabPane = images.map((image,i) => 
                <div key={i}
                    className= { i === 0 ? "tab-pane active" : "tab-pane" } 
                    id={"tabs-"+(i+1)} 
                    role="tabpanel"
                    >
                    <div className="product__details__pic__item">
                        <img src={image} key={i} alt="" />
                    </div>
                </div>
            )
        }
        
        return (
            <div className="row"> 
                <div className="col-lg-3 col-md-3">
                    <ul className="nav nav-tabs  wow fadeInLeftBig " data-wow-duration="2s"  role="tablist">
                        {navItem}
                         
                    </ul>
                </div>
                <div className="col-lg-6 col-md-9">
                    <div className="tab-content  wow fadeInRightBig " data-wow-duration="2s" >
                        {tabPane}
                         
                    </div>
                </div>
            </div>
        );
    }
}

export default SD_Pictures;