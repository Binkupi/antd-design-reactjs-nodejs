import React, { Component } from 'react';

class TeamSection extends Component {
    render() {
        return (
            <section className="team spad  ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12  wow fadeInUpBig" data-wow-duration="1s">
                            <div className="section-title">
                                <span>Cửa hàng chúng tôi</span>
                                <h2>Gặp gỡ thành viên</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6  wow fadeInLeftBig" data-wow-duration="1s">
                            <div className="team__item">
                                <img src="img/about/team-1.jpg" alt="" />
                                <h4>Trần Tuấn Phương</h4>
                                <span>18521280</span>
                            </div>
                        </div> 
                        <div className="col-lg-4 col-md-6 col-sm-6  wow fadeInUpBig" data-wow-duration="1s">
                            <div className="team__item">
                                <img src="img/about/team-3.jpg" alt="" />
                                <h4>Tống Đình Quốc</h4>
                                <span>18521312</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6  wow fadeInRightBig" data-wow-duration="1s">
                            <div className="team__item">
                                <img src="img/about/team-4.jpg" alt="" />
                                <h4>Đinh Ngọc Phúc</h4>
                                <span>18521251</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default TeamSection;