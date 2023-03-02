import React, { Component } from 'react';

class TestimonialSection extends Component {
    render() {
        return (
            <section className="testimonial  ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 p-0 wow fadeInLeftBig " data-wow-duration="1s">
                            <div className="testimonial__text">
                                <span className="icon_quotations" />
                                <p>“Đi một ngày đàng, tốn năm mươi ngàn tiền xăng.”
                                </p>
                                <div className="testimonial__author">
                                    <div className="testimonial__author__pic">
                                        <img src="/img/about/testimonial-author.jpg" alt="" />
                                    </div>
                                    <div className="testimonial__author__text">
                                        <h5>Nguyễn Hữu Phát</h5>
                                        <p>Nhân viên dọn dẹp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 p-0 wow fadeInRightBig " data-wow-duration="1s">
                            <div className="testimonial__pic set-bg"  style={{backgroundImage: "url(/img/about/testimonial-pic.jpg)"}} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default TestimonialSection;