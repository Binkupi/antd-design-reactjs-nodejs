<div className={`col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix ${result}`} >
                    <div className="product__item">
                        <div className="product__item__pic " style={{ backgroundImage: `url(${images[0]})` }} >
                            <ul className="product__hover">
                                <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                                <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                                <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6>{name}</h6>
                            <a href="#" className="add-cart">+ Add To Cart</a>
                            <div className="rating">
                                {this.renderStarRate(rating.grade)}
                            </div>
                            <h5>{price}</h5>
                            <div className="product__color__select">
                                <label >
                                    <input type="radio" id="pc-4" />
                                </label>
                                <label className="active black">
                                    <input type="radio" id="pc-5" />
                                </label>
                                <label className="grey">
                                    <input type="radio" id="pc-6" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>