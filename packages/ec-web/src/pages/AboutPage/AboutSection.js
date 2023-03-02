import React, { Component } from 'react';

class AboutSection extends Component {
    render() {
        return (
            <section className="about spad">
                <div className="container">
                    <div className="row  wow fadeInUpBig " data-wow-duration="1" >
                        <div className="col-lg-12">
                            <div className="about__pic">
                            <img src="img/about/about-us.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item  wow fadeInLeftBig " data-wow-duration="1" >
                                <h4>Chúng tôi là ai ?</h4>
                                <p>Là sinh viên của trường Đại học Công nghệ thông tin Thành phố Hồ Chí Minh.</p>
                            </div>
                        </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="about__item  wow fadeInUpBig " data-wow-duration="1" >
                            <h4>Chúng tôi làm gì ?</h4>
                            <p>Trong quá trình xây dựng một trang web bán quần áo hiện đại và đầy đủ tính năng.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="about__item  wow fadeInRightBig " data-wow-duration="1" >
                            <h4>Tại sao lại chọn chúng tôi?</h4>
                            <p>Cửa hàng sẽ đem đến những sản phẩm tốt nhất cho khách hàng, bạn sẽ hài lòng về cả sản phẩm cùng với chất lượng chăm sóc khách hàng mà chúng tôi mang đến.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AboutSection;