import React, { Component } from 'react';

class ContactText extends Component {
    render() {
        return (
            <div className="contact__text  wow fadeInLeftBig " data-wow-duration="1s">
                <div className="section-title">
                    <span>Thông tin</span>
                    <h2>Liên hệ</h2>
                    <p>Cửa hàng chúng tôi mở cửa từ 7 giờ đến 22 giờ hàng ngày, từ thứ 2 đến thứ 7.</p>
                </div>
                <ul>
                    <li>
                        <h4>Thành phố Hồ Chí Minh</h4>
                        <p>Song Hành, khu phố 6, Thủ Đức, Thành phố Hồ Chí Minh <br />028 3725 2002</p>
                    </li>
                    <li>
                        <h4>Bình Dương</h4>
                        <p>Đông Hòa, Dĩ An, Bình Dương<br />0867 739 268</p>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ContactText;