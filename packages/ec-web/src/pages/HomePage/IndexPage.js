import React, { Component, Fragment } from 'react';
import SearchContainer from '../../containers/SearchContainer';
import ProductListContainer from './../../containers/ProductListContainer';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import Countdown from 'react-countdown';
import {Helmet} from 'react-helmet'
import WOW from 'wowjs'
class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }
    componentDidMount() {
        
        this.props.fetchProductsRequest();
        this.props.getDataPage(this.state.page);
        new WOW.WOW({
            live: false
        }).init(); 
        // this.addInteraction();
    }
    componentDidUpdate() {
       
        this.addInteraction();
    }


    addInteraction = () => {
        $(function () {
            /*------------------
            Background Set
            --------------------*/
            $('.set-bg').each(function () {
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });

            //Search Switch
            $('.search-switch').on('click', function () {
                $('.search-model').fadeIn(400);
            });

            $('.search-close-switch').on('click', function () {
                $('.search-model').fadeOut(400, function () {
                    $('#search-input').val('');
                });
            });
            
            /*------------------
                Accordin Active
            --------------------*/
            $('.collapse').on('shown.bs.collapse', function () {
                $(this).prev().addClass('active');
            });

            $('.collapse').on('hidden.bs.collapse', function () {
                $(this).prev().removeClass('active');
            });

             /*-------------------
                Radio Btn
            --------------------- */
            $(".product__color__select label, .shop__sidebar__size label, .product__details__option__size label").on('click', function () {
                $(".product__color__select label, .shop__sidebar__size label, .product__details__option__size label").removeClass('active');
                $(this).addClass('active');
            });
        })
    }


    sales = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>H???t h???n</span>;
          } else {
            // Render a countdown
            return (
                <Fragment>
                    <div className='cd-item'>
                        <span>{days}</span> <p>Days</p> 
                    </div>
                    <div className='cd-item'>
                        <span>{hours}</span> 
                        <p>Hours</p> 
                    </div>
                    <div className='cd-item'>
                        <span>{minutes}</span> 
                        <p>Minutes</p> 
                    </div>
                    <div className='cd-item'>
                        <span>{seconds}</span>
                        <p>Seconds</p>
                    </div>
                </Fragment>
                
            );
          }
    }

    render() {
        return (
            <Fragment>
                <Helmet >
                    <title>Male Fashion - C???a h??ng th???i trang nam 2030</title>
                </Helmet>
                <section className="hero wow fadeInUpBig " data-wow-duration="1s">
                    <OwlCarousel 
                        className='hero__slider'
                        loop 
                        margin={0} 
                        items={1} 
                        dots={false} 
                        nav={true} 
                        navText={["<span className='arrow_left'><span/>", "<span className='arrow_right'><span/>"]}
                        smartSpeed={1200}
                        autoplay={false}
                    >
                        <div className="hero__items set-bg" data-setbg="/img/hero/hero-1.jpg" >
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-7 col-md-8">
                                        <div className="hero__text">
                                            <h6>B??? s??u t???p h??</h6>
                                            <h2>B??? s??u t???p Thu - ????ng 2030</h2>
                                            <p>???????c thi???t k??? b???i nh???ng chuy??n gia h??ng ?????u trong l??nh v???c th???i trang. ?????m b???o tuy???t ?????i v??? ch???t l?????ng v?? ????? b???n tuy???t ?????i.</p>
                                            <a href="/shop" className="primary-btn">Xem ngay <span className="arrow_right"></span></a>
                                            <div className="hero__social">
                                                <a href="/"><i className="fa fa-facebook"></i></a>
                                                <a href="/"><i className="fa fa-twitter"></i></a>
                                                <a href="/"><i className="fa fa-pinterest"></i></a>
                                                <a href="/"><i className="fa fa-instagram"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero__items set-bg" data-setbg="/img/hero/hero-2.jpg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-7 col-md-8">
                                        <div className="hero__text">
                                            <h6>B??? s??u t???p h??</h6>
                                            <h2>B??? s??u t???p Thu - ????ng 2030</h2>
                                            <p>???????c thi???t k??? b???i nh???ng chuy??n gia h??ng ?????u trong l??nh v???c th???i trang. ?????m b???o tuy???t ?????i v??? ch???t l?????ng v?? ????? b???n tuy???t ?????i.</p>
                                            <a href="/shop" className="primary-btn">Xem ngay <span className="arrow_right"></span></a>
                                            <div className="hero__social">
                                                <a href="/"><i className="fa fa-facebook"></i></a>
                                                <a href="/"><i className="fa fa-twitter"></i></a>
                                                <a href="/"><i className="fa fa-pinterest"></i></a>
                                                <a href="/"><i className="fa fa-instagram"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </section>
                <section className="banner spad hero wow fadeInUpBig " data-wow-duration="1s">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 offset-lg-4 wow fadeInRightBig" data-wow-duration="1s">
                                <div className="banner__item">
                                    <div className="banner__item__pic">
                                        <img src="/img/banner/banner-1.jpg" alt="" />
                                    </div>
                                    <div className="banner__item__text">
                                        <h2>B??? s??u t???p 2030</h2>
                                        <a href="/shop">Kh??m ph?? ngay</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 wow fadeInLeftBig" data-wow-duration="1s">
                                <div className="banner__item banner__item--middle">
                                    <div className="banner__item__pic">
                                        <img src="/img/banner/banner-2.jpg" alt='' />
                                    </div>
                                    <div className="banner__item__text">
                                        <h2>Ph??? ki???n</h2>
                                        <a href="/shop">Kh??m ph?? ngay</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 wow fadeInUpBig" data-wow-duration="1s">
                                <div className="banner__item banner__item--last">
                                    <div className="banner__item__pic">
                                        <img src="/img/banner/banner-3.jpg" alt='' />
                                    </div>
                                    <div className="banner__item__text">
                                        <h2>Gi??y</h2>
                                        <a href="/shop">Kh??m ph?? ngay</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="product spad hero" >
                    <ProductListContainer history={this.props.history}/>

                </section>

                {/* <!-- Categories Section Begin --> */}
                <section className="categories spad wow fadeInUpBig " data-wow-duration="1s">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="categories__text">
                                    <h2>Trang ph???c <br /> <span>B??? s??u t???p gi??y</span> <br /> Ph??? ki???n</h2>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="categories__hot__deal">
                                    <img src="/img/product-sale.png" alt="" />
                                    <div className="hot__deal__sticker">
                                        <span>Gi???m gi??</span>
                                        <h5>30%</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 offset-lg-1">
                                <div className="categories__deal__countdown">
                                    <span>Deal hot trong tu???n</span>
                                    <h2>T??i ??eo nhi???u ng??n m??u n??u</h2>
                                    <div className="categories__deal__countdown__timer" id="countdown">
                                        <Countdown
                                            date={new Date('2021/07/15')}
                                            renderer={this.sales}
                                        />
                                    </div>
                                    <a href="/shop" className="primary-btn">Xem ngay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Categories Section End --> */}

                {/* <!-- Instagram Section Begin --> */}
                <section className="instagram spad ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 hero wow fadeInLeftBig " data-wow-duration="1s">
                                <div className="instagram__pic">
                                    <div className="instagram__pic__item set-bg" data-setbg="/img/instagram/instagram-1.jpg"></div>
                                    <div className="instagram__pic__item set-bg" data-setbg="/img/instagram/instagram-2.jpg"></div>
                                    <div className="instagram__pic__item set-bg" data-setbg="/img/instagram/instagram-3.jpg"></div>
                                    <div className="instagram__pic__item set-bg" data-setbg="/img/instagram/instagram-4.jpg"></div>
                                    <div className="instagram__pic__item set-bg" data-setbg="/img/instagram/instagram-5.jpg"></div>
                                    <div className="instagram__pic__item set-bg" data-setbg="/img/instagram/instagram-6.jpg"></div>
                                </div>
                            </div>
                            <div className="col-lg-4 hero wow fadeInRightBig " data-wow-duration="1s">
                                <div className="instagram__text">
                                    <h2>Instagram</h2>
                                    <p>N??i c???a h??ng c???p nh???t nh???ng s???n ph???m c??ng b??? s??u t???p m???i nh???t qua nh???ng h??nh ???nh v?? c??ng ch???t l?????ng</p>
                                    {/* <h3>/Male_Fashion</h3> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Instagram Section End --> */}

                {/* <!-- Latest Blog Section Begin --> */}
                <section className="latest spad hero wow fadeInUpBig " data-wow-duration="1s">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <span>Tin t???c m???i nh???t</span>
                                    <h2>Xu h?????ng th???i trang m???i</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" data-setbg="/img/blog/blog-1.jpg"></div>
                                    <div className="blog__item__text">
                                        <span><img src="/img/icon/calendar.png" alt="" /> 16 05 2021</span>
                                        <h5>S??? k???t h???p gi???a th???i trang v?? c?? ph??</h5>
                                        <a href="/">?????c th??m</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" data-setbg="/img/blog/blog-2.jpg"></div>
                                    <div className="blog__item__text">
                                        <span><img src="/img/icon/calendar.png" alt="" /> 21 05 2021</span>
                                        <h5>Gu th???i trang c???a ban nh???c Enternity</h5>
                                        <a href="/">?????c th??m</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" data-setbg="/img/blog/blog-3.jpg"></div>
                                    <div className="blog__item__text">
                                        <span><img src="/img/icon/calendar.png" alt="" /> 28 06 2021</span>
                                        <h5>Trang ph??? d?? ngo???i d??nh cho nam gi???i</h5>
                                        <a href="/">?????c th??m</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <SearchContainer history={this.props.history}/>
            </Fragment>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        products: state.products.results,
        page: state.page
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsRequest: () => {
            dispatch(actions.fetchProductsRequest());
        },
        getDataPage: (data) => {
            dispatch(actions.getDataPage(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
