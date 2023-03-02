import React, { Component } from 'react';

class SD_ProductDetailsTab extends Component {
    render() {
        var {product} = this.props;
        return (
            <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#tabs-5"
                        role="tab">Mô tả</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tabs-7" role="tab">Thông tin thêm</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="tabs-5" role="tabpanel">
                        <div className="product__details__tab__content">
                            <p className="note">{product.shortDesc}</p>
                            <div className="product__details__tab__content__item">
                                <h5>Thông tin sản phẩm</h5>
                                <p>{product.fullDesc}</p> 
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="tabs-7" role="tabpanel">
                        <div className="product__details__tab__content">
                            <p className="note">{product.shortDesc}</p>
                            <div className="product__details__tab__content__item">
                                <h5>Thông tin sản phẩm</h5>
                                <p>{product.additionalInfo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SD_ProductDetailsTab;