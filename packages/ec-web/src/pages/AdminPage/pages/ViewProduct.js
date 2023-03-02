import React, { Component, Fragment } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

const animatedComponents = makeAnimated();

export default class AddProductPage extends Component {
    constructor(props) {
        super(props);
        this.statusSelect = React.createRef();
        this.categorySelect = React.createRef();
        this.tagSelect = React.createRef();
        this.imageSlider = React.createRef();
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            loading: true,
            id: query.get('id'),
            productOptions: [],
            productImages: []
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `/api/products/${this.state.id}`,
        }).then(res => {
            if (res && res.status === 200) {
                let data = res.data;
                document.getElementById('name').value = data.name;
                document.getElementById('slug').value = data.slug;
                document.getElementById('rating').value = data.rating;
                document.getElementById('price').value = data.price.toLocaleString('de-DE') + 'đ';
                document.getElementById('shortDesc').innerHTML = data.shortDesc;
                document.getElementById('fullDesc').innerHTML = data.fullDesc;
                document.getElementById('additionalInfo').innerHTML = data.additionalInfo;
                let statusLabel = 'Bình thường';
                switch (data.status) {
                    case 1:
                        statusLabel = 'Best Sellers';
                        break;
                    case 2:
                        statusLabel = 'New Arrivals';
                        break;
                    case 3:
                        statusLabel = 'Hot Sales';
                        break;
                }
                this.statusSelect.select.setValue({ value: data.status, label: statusLabel })
                this.categorySelect.select.setValue({ value: data.category, label: data.category })
                this.tagSelect.select.setValue(data.tags.map(tag => {
                    return {
                        value: tag,
                        label: tag
                    }
                }));
                this.setState({
                    loading: false,
                    productOptions: data.options,
                    productImages: data.images
                });
                console.log(data.images);
            } else {
                alert("Sản phẩm cần xem không tồn tại!!!");
                this.props.history.push(`/admin/xem-san-pham`);
            }
        }).catch(error => {
            if(error.response) {
                alert(error.response.data.message);
            }
            this.setState({
                loading: false
            })
        })
    }

    displayLoading = () => {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }

    handleGoBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/xem-san-pham`)
    }

    handleGoToEdit = (event, id) => {
        event.preventDefault();
        console.log(this.props.history);
        this.props.history.push(`/admin/sua-san-pham?id=${id}`)
    }

    render() {
        const productOptions = this.state.productOptions.map((option, index) => {
            return (
                <tr>
                    <td className="text-center">{option.size}</td>
                    <td className="text-center">{option.quantity}</td>
                    <td className="text-center">{option.remaining}</td>
                </tr>
            );
        });
        const productImages = this.state.productImages.map((image, index) => {
            return (
                <div className="image-item" key={index}>
                    <img className="image-item__img" src={process.env.REACT_APP_API_URL + image} alt=""/>
                </div>
            )
        });

        console.log(this.state.productImages);
        return (
            <Fragment>
                <h4>Xem sản phẩm #{this.state.id}</h4>
                <form className="forms-sample" id="createNewProduct">
                    <div className="row mx-0">
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input type="text" className="form-control readonly" id="name" name="name" disabled onChange={this.handleSLug} />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="slug">Đường dẫn</label>
                            <input type="text" className="form-control readonly" id="slug" name="slug" disabled />
                        </div>
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="price">Giá sản phẩm</label>
                            <input type="text" min={1} className="form-control readonly" name="price" id="price" disabled onChange={this.handleInputChange} aria-label="Amount (to the nearest dollar)" />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="status">Tình trạng phân loại</label>
                            <Select
                                ref={(ref) => { this.statusSelect = ref }}
                                isDisabled
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="category">Danh mục</label>
                            <Select
                                ref={(ref) => { this.categorySelect = ref }}
                                isDisabled
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="tags">Gắn thẻ</label>
                            <Select
                                isMulti
                                isDisabled
                                ref={(ref) => { this.tagSelect = ref }}
                                components={{
                                    IndicatorSeparator: () => null,
                                    animatedComponents
                                }}
                            />
                        </div>
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="price">Đánh giá sản phẩm (1-5)</label>
                            <input type="number" min={1} max={5} className="form-control" name="rating" id="rating" required />
                        </div>
                        <div className="form-group col-12 mx-0 pl-0 pr-2" style={{ zIndex: "0" }}>
                            <label htmlFor="category">Kích cỡ & Số lượng</label>
                            <table className="table table--custom table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">Size</th>
                                        <th className="text-center">Số lượng nhập</th>
                                        <th className="text-center">Số lượng còn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productOptions}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortDesc">Mô tả ngắn</label>
                        <div className="border p-3 readonly" id="shortDesc"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullDesc">Mô tả chi tiết</label>
                        <div className="border p-3 readonly" id="fullDesc"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="additionalInfo">Thông tin thêm</label>
                        <div className="border p-3 readonly" id="additionalInfo"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Hình ảnh sản phẩm</label>
                        <div className="border p-3 readonly bg-dark">
                        { this.state.productImages.length > 0 && (<OwlCarousel 
                            className='owl-carousel owl-theme'
                            loop={false}
                            margin={0} 
                            items={1} 
                            dots={false} 
                            nav={false} 
                            navText={["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"]}
                            smartSpeed={1200}
                            autoHeight={false}
                            autoWidth={true}
                            autoplay={false}
                        >
                            { productImages }
                        </OwlCarousel>)}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-success" onClick={ event => this.handleGoToEdit(event, this.state.id) }>Chỉnh sửa sản phẩm</button>
                        <button type="reset" className="btn btn-danger" onClick={this.handleGoBack}>Quay lại</button>
                    </div>
                </form>
                {this.displayLoading()}
            </Fragment>
        )
    }
}
