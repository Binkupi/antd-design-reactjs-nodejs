import React,{Component,Fragment} from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render(){
    return (
        <Fragment>
                {/* <!-- Footer Section Begin --> */}
            <footer className="footer wow fadeInLeftBig" data-wow-duration="1s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <Link to="/"><img src="/img/footer-logo.png" alt=""/></Link>
                                </div>
                                <p>Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi</p>
                                <Link to=""><img src="img/payment.png" alt=""/></Link>
                            </div>
                        </div>
                        <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Mua sắm</h6>
                                <ul>
                                    <li><Link to="/shop">Cửa hàng</Link></li>
                                    <li><Link to="/shop/cart">Giỏ hàng</Link></li>
                                    <li><Link to="/payment">Thanh toán</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Liên hệ</h6>
                                <ul>
                                    <li><Link to="/contact">Liên hệ</Link></li>
                                    <li><Link to="/about">Về chúng tôi</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                            <div className="footer__widget">
                                {/* <h6>Bản đồ</h6> */}
                                <div className="map" style={{height: "200px"}} >
                                    <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3918.2321520912697!2d106.80214512771671!3d10.869939464932909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1622738707740!5m2!1svi!2s" height={200} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="footer__copyright__text">
                                <p>Copyright ©
                                    <script>
                                        document.write(new Date().getFullYear());
                                    </script>2020
                                    Bản quyền trang web thuộc về <a href="/">Male Fashion</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Footer Section End --> */}

        </Fragment>
        
    );
  }
  
}

export default Footer;
