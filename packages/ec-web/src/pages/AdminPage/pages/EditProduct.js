import React, { Component, Fragment } from 'react';
import convertToSlug from '../../../utils/convertToSlug';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import axios from 'axios';

const animatedComponents = makeAnimated();

class EditProduct extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.statusSelect = React.createRef();
        this.categorySelect = React.createRef();
        this.tagSelect = React.createRef();
        this.state = {
            imgSrc: [],
            id: query.get('id'),
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
            url: `/api/products/${this.state.id}`
        }).then(res => {
            if (res && res.status === 200) {
                let data = res.data;
                document.getElementById('name').value = data.name;
                document.getElementById('slug').value = data.slug;
                document.getElementById('price').value = data.price;
                document.getElementById('rating').value = data.rating.grade;
                document.getElementById('shortDesc').value = data.shortDesc;
                document.getElementById('fullDesc').value = data.fullDesc;
                document.getElementById('additionalInfo').value = data.additionalInfo;
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
                data.options.map(option => {
                    document.getElementById(`size${option.size}Checkbox`).setAttribute('checked', 'true');
                    document.getElementById(`size${option.size}`).value = option.quantity;
                    document.getElementById(`size${option.size}`).removeAttribute('disabled')
                    document.getElementById(`remaining${option.size}`).value = option.remaining;
                    document.getElementById(`remaining${option.size}`).removeAttribute('disabled')
                })
                this.setState({
                    productOptions: data.options,
                    imgSrc: data.images
                });
                this.setState({
                    loading: false
                });
            } else {
                alert("Sản phẩm cần chỉnh sửa không tồn tại!!!");
                this.props.history.push(`/admin/xem-san-pham`);
            }
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message)
            }
            this.setState({
                loading: false
            });
        })

        axios({
            method: 'GET',
            url: `/api/categories`
        }).then(res => {
            if (res && res.status === 200) {
                const categories = res.data.map(category => {
                    return {
                        value: category.name,
                        label: category.name
                    }
                }) 
                this.setState({
                    categoryOptions: categories
                });
                this.setState({
                    loading: false
                });
            }
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message)
            }
            this.setState({
                loading: false
            });
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
            document.getElementById('remainingS').removeAttribute('disabled')
        } else {
            quantityInput.setAttribute('disabled', 'true');
            document.getElementById('remainingS').setAttribute('disabled', 'true');
            document.getElementById('remainingS').value = 0;
            quantityInput.value = 0;
        }
    }

    handleSizeM = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeM');
        if (checked) {
            quantityInput.removeAttribute('disabled');
            document.getElementById('remainingM').removeAttribute('disabled');
        } else {
            quantityInput.setAttribute('disabled', 'true');
            document.getElementById('remainingM').setAttribute('disabled', 'true');
            document.getElementById('remainingM').value = 0;
            quantityInput.value = 0;
        }
    }

    handleSizeL = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeL');
        if (checked) {
            quantityInput.removeAttribute('disabled');
            document.getElementById('remainingL').removeAttribute('disabled');;
        } else {
            quantityInput.setAttribute('disabled', 'true');
            document.getElementById('remainingL').setAttribute('disabled', 'true');
            document.getElementById('remainingL').value = 0;
            quantityInput.value = 0;
        }
    }

    handleSizeXL = (event) => {
        const checked = event.target.checked;
        const quantityInput = document.getElementById('sizeXL');
        if (checked) {
            quantityInput.removeAttribute('disabled');
            document.getElementById('remainingXL').removeAttribute('disabled');
        } else {
            quantityInput.setAttribute('disabled', 'true');
            document.getElementById('remainingXL').setAttribute('disabled', 'true');
            document.getElementById('remainingXL').value = 0;
            quantityInput.value = 0;
        }
    }

    handleSLug =(event) => {
        const value = event.target.value;
        console.log(value);
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

        console.log(options)
        for (var pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios({
            method: 'PUT',
            url: `/api/products/${this.state.id}`,
            data: data,
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            if (res && res.status === 200) {
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

    handleGoBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/xem-san-pham`)
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
                <form className="forms-sample" id="createNewProduct" enctype="multipart/form-data">
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
                        <div className="form-group col-12 mx-0 pl-0 pr-2" style={{ zIndex: "0" }}>
                            <label htmlFor="category">Kích cỡ & Số lượng</label>
                            <div className="border size-listing px-3 pt-2">
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="sizeSCheckbox" value="checkedValue" onClick={this.handleSizeS} /> Size S
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="sizeS" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Còn lại</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="remainingS" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="sizeMCheckbox" value="checkedValue" onClick={this.handleSizeM} /> Size M
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="sizeM" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Còn lại</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="remainingM" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="sizeLCheckbox" value="checkedValue" onClick={this.handleSizeL} /> Size L
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="sizeL" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Còn lại</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="remainingL" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0 d-flex align-items-center">
                                    <div className="col-3">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label mb-0">
                                                <input className="form-check-input" type="checkbox" name="" id="sizeXLCheckbox" value="checkedValue" onClick={this.handleSizeXL} /> Size XL
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Số lượng</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="sizeXL" aria-describedby="helpId" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 row m-0 d-flex align-items-center">
                                        <div className="col">
                                            <label className="mb-0">Còn lại</label>
                                        </div>
                                        <div className="col pt-2">
                                            <div className="form-group">
                                                <input type="number" min={1} className="form-control" id="remainingXL" aria-describedby="helpId" disabled />
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
                        <button className="btn btn-success" onClick={this.handleSubmit}>Cập nhật thay đổi</button>
                        <button type="reset" className="btn btn-danger" onClick={this.handleGoBack}>Quay lại</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProduct));
