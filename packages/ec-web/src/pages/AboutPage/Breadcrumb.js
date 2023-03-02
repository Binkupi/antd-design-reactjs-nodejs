import React, { Component } from 'react';

class Breadcrumb extends Component {
    Display = () => { 
        return this.props.breadcrumbs.map((breadcrumb,index) => {
            if (index===this.props.breadcrumbs.length) {
                return <span key={index}>{breadcrumb}</span> 
            }
            else { 
                return <a key={index} href="./index.html">{breadcrumb}</a> 
            }
        })
    }

    render() {
    

        return ( 
            <section className="breadcrumb-option wow fadeInUpBig " data-wow-duration="1s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                {/* {this.Display} */}
                                <h4>About Us</h4>
                                <div className="breadcrumb__links">
                                    {this.Display()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        );
    }
}

export default Breadcrumb;