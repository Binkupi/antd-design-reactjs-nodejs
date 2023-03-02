import React, { Component } from 'react';

class SD_breadcrumb extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="product__details__breadcrumb  wow fadeInUpBig " data-wow-duration="1s">
                        <a href="./">Trang chủ</a>
                        <a href="./shop">Cửa hàng</a>
                        <span>{this.props.product.name}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SD_breadcrumb;