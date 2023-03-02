import React, { Component, Fragment } from 'react'
import convertToSlug from '../../../utils/convertToSlug';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

const animatedComponents = makeAnimated();

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.statusSelect = React.createRef();
        this.categorySelect = React.createRef();
        this.tagSelect = React.createRef();
        this.state = {
            imgSrc: [],
            loading: true,
            categoryOptions: [],
            tagOptions: [],
            statusOptions: [
                {
                    label: 'Bình thường',
                    value: 0
                },
                {
                    label: 'New Arrivals',
                    value: 1
                },
                {
                    label: 'Hot Sales',
                    value: 2
                }
            ]
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/categories'
        }).then(res => {
            if (res && res.status === 200) {
                const categories = res.data.map(category => {
                    return {
                        value: category.name,
                        label: category.name
                    }
                }) 
                this.setState({
                    categoryOptions: categories,
                    loading: false
                })
            }
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message)
            }
        })

        axios({
            method: 'GET',
            url: '/api/tags'
        }).then(res => {
            if (res && res.status === 200) {
                const tags = res.data.map(tag => {
                    return {
                        value: tag.name,
                        label: tag.name
                    }
                }) 
                this.setState({
                    tagOptions: tags,
                    loading: false
                })
            }
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message)
            }
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


    handleSizeS = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeS');
        if (checked) {
            quantityInput.removeAttribute('disabled');
        } else {
            quantityInput.setAttribute('disabled', 'true');
        }
    }

    handleSizeM = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeM');
        if (checked) {
            quantityInput.removeAttribute('disabled');
        } else {
            quantityInput.setAttribute('disabled', 'true');
        }
    }

    handleSizeL = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeL');
        if (checked) {
            quantityInput.removeAttribute('disabled');
        } else {
            quantityInput.setAttribute('disabled', 'true');
        }
    }

    handleSizeXL = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeXL');
        if (checked) {
            quantityInput.removeAttribute('disabled');
        } else {
            quantityInput.setAttribute('disabled', 'true');
        }
    }

    handleSLug =(event) => {
        const value = event.target.value;
        
        document.getElementById('slug').value = convertToSlug(value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        let data = new FormData();

        const sizeS = document.getElementById('sizeS');
        const sizeM = document.getElementById('sizeM');
        const sizeL = document.getElementById('sizeL');
        const sizeXL = document.getElementById('sizeXL');
        let options = [];
        if (sizeS.value)
            options.push({ size: 'S', quantity: sizeS.value, remaining: sizeS.value });
        if (sizeM.value)
            options.push({ size: 'M', quantity: sizeM.value, remaining: sizeM.value });
        if (sizeL.value)
            options.push({ size: 'L', quantity: sizeL.value, remaining: sizeL.value });
        if (sizeXL.value)
            options.push({ size: 'XL', quantity: sizeXL.value, remaining: sizeXL.value });

        var ins = document.getElementById('images').files.length;
        for (var i = 0; i < ins; i++) {
            data.append("images", document.getElementById('images').files[i]);
        }


        data.append('name', document.getElementById('name').value);
        data.append('slug', document.getElementById('slug').value);
        data.append('price', document.getElementById('price').value);
        data.append('rating', document.getElementById('rating').value);
        data.append('status', this.statusSelect.select.getValue()[0].value);
        data.append('category', this.categorySelect.select.getValue()[0].value);
        data.append('tags', JSON.stringify(this.tagSelect.select.getValue().map(option => {
            return option.value;
        })));
        data.append('options', JSON.stringify(options));
        data.append('shortDesc', document.getElementById('shortDesc').value);
        data.append('fullDesc', document.getElementById('fullDesc').value);
        data.append('additionalInfo', document.getElementById('additionalInfo').value);

        axios({
            method: 'POST',
            data: data,
            url: '/api/products',
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            if (res && res.status === 200) {
                document.getElementById('createNewProduct').reset();
                this.statusSelect.select.clearValue();
                this.categorySelect.select.clearValue();
                this.tagSelect.select.clearValue();
                document.getElementById('sizeS').setAttribute('disabled', 'true');
                document.getElementById('sizeM').setAttribute('disabled', 'true');
                document.getElementById('sizeL').setAttribute('disabled', 'true');
                document.getElementById('sizeXL').setAttribute('disabled', 'true');
                this.setState({
                    imgSrc: []
                });
                alert("Thêm sản phẩm thành công!!!");
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!!!");
            }
            this.setState({
                loading: false
            });
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message)
            }
            this.setState({
                loading: false
            });
        })
    }

    handleFileOnChange = (event) => {
        const files = [...event.target.files];

        const urls = files.map(file => {
            return URL.createObjectURL(file)
        })
        this.setState({
            imgSrc: urls
        })
    }

    displayImg = () => {
        if(this.state.imgSrc.length > 0) {
            const imgs = this.state.imgSrc.map((src, index) => {
                return (
                    <div className="image-item" key={index}>
                        <img className="image-item__img" src={src} />
                    </div>
                )
            });

            return (
                <div className="img-list bg-dark">
                    {imgs}
                </div>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <h4>Thêm sản phẩm</h4>
                <form className="forms-sample" id="createNewProduct">
                    <div className="row mx-0">
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="name" name="name" required onChange={this.handleSLug} />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="slug">Đường dẫn</label>
                            <input type="text" className="form-control" id="slug" name="slug" required />
                        </div>
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="price">Giá sản phẩm</label>
                            <input type="number" min={1} className="form-control" name="price" id="price" required onChange={this.handleInputChange} aria-label="Amount (to the nearest dollar)" />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="status">Tình trạng phân loại</label>
                            <Select
                                ref={(ref) => { this.statusSelect = ref }}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                defaultValue={this.state.statusOptions[0]}
                                options={this.state.statusOptions}
                            />
                        </div>
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="category">Danh mục</label>
                            <Select
                                ref={(ref) => { this.categorySelect = ref }}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                defaultValue={this.state.categoryOptions[0]}
                                options={this.state.categoryOptions}
                            />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="tags">Gắn thẻ</label>
                            <Select
                                isMulti
                                ref={(ref) => { this.tagSelect = ref }}
                                components={{
                                    IndicatorSeparator: () => null,
                                    animatedComponents
                                }}
                                defaultValue={this.state.tagOptions[0]}
                                options={this.state.tagOptions}
                            />
                        </div>
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="price">Đánh giá sản phẩm (1-5)</label>
                            <input type="number" min={1} max={5} className="form-control" name="rating" id="rating" required />
                        </div>
                        <div className="form-group col-12 mx-0 px-0" style={{ zIndex: "0" }}>
                            <label htmlFor="category">Kích cỡ & Số lượng</label>
                            <div className="border size-listing px-3 pt-2">
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="" value="checkedValue" onClick={this.handleSizeS} /> Size S
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-9 row m-0 d-flex align-items-center">
                                        <div className="col-3">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col-3 pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="sizeS" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="" value="checkedValue" onClick={this.handleSizeM} /> Size M
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-9 row m-0 d-flex align-items-center">
                                        <div className="col-3">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col-3 pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="sizeM" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="" value="checkedValue" onClick={this.handleSizeL} /> Size L
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-9 row m-0 d-flex align-items-center">
                                        <div className="col-3">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col-3 pt-2">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="sizeL" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="" value="checkedValue" onClick={this.handleSizeXL} /> Size XL
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-9 row m-0 d-flex align-items-center">
                                        <div className="col-3">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col-3 pt-2">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="sizeXL" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortDesc">Mô tả ngắn</label>
                        <textarea className="form-control" id="shortDesc" name="shortDesc" rows={2} required onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullDesc">Mô tả chi tiết</label>
                        <textarea className="form-control" id="fullDesc" name="fullDesc" rows={4} required onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="additionalInfo">Thông tin thêm</label>
                        <textarea className="form-control" id="additionalInfo" name="additionalInfo" rows={4} required onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Tải hình ảnh</label>
                        <input type="file" multiple id="images" name="images" className="d-block" required onChange={this.handleFileOnChange} />
                    </div>
                    { this.displayImg() }
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-success" onClick={this.handleSubmit}>Thêm sản phẩm</button>
                        <button type="reset" className="btn btn-danger">Hủy</button>
                    </div>
                </form>
                {this.displayLoading()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.authorization
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            dispatch(actions.setToken(token));
        },
        setAdmin: (isAdmin) => {
            dispatch(actions.setAdmin(isAdmin));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProduct));
