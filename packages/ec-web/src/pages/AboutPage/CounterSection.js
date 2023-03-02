import React, { Component } from 'react';

class CounterSection extends Component {
    render() {
        return (
            <section className="counter spad  wow fadeInUpBig " data-wow-duration="1s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">102</h2>
                                </div>
                                <span>Khách hàng <br />thân thiết</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">30</h2>
                                </div>
                                <span>Danh mục <br />thời trang</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">12</h2>
                                </div>
                                <span>Cửa hàng <br />toàn quốc</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">98</h2>
                                    <strong>%</strong>
                                </div>
                                <span>Khách hàng <br />hài lòng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CounterSection;