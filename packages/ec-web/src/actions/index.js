//Lấy các action types
import * as types from "./../constants/ActionTypes";
import callApi from "./../utils/apiCaller";

//xử lý render list sản phẩm
export const fetchProducts = (products) => {
  return {
    type: types.FETCH_PRODUCTS,
    products, //products=products
  };
};

//Lên API lấy dữ liệu products về
export const fetchProductsRequest = (page = 1, pageSize = 20, queryParams) => {
  return (dispatch) => {
    const queryString = new URLSearchParams({
      ...queryParams,
      page,
      pageSize
    }).toString();

    return callApi(`products?${queryString}`, "GET", null).then((res) => {
      dispatch(fetchProducts(res.data));
    });
  };
};

//xử lý trang index đang gọi product
export const getDataPage = (data) => {
  return {
    type: types.PAGE_INDEX,
    data, //products=products
  };
};

//xử lý tìm kiếm
export const onSearch = (keyword) => {
  return {
    type: types.SEARCH,
    keyword, //products=products
  };
};

//xử lý sort theo giá
export const onSort = (status) => {
  return {
    type: types.SORT,
    status, //products=products
  };
};

//add thông tin user vào order
export const addInfoUserToOrder = (infoUser) => {
  return {
    type: types.ADD_INFO_USER_TO_ORDER,
    infoUser,
  };
};

//add thông tin user vào order
export const addCouponToOrder = (infoCoupon) => {
  return {
    type: types.ADD_COUPON_TO_ORDER,
    infoCoupon,
  };
};

//Thêm sản phẩm
export const saveBill = (bill) => {
  return {
    type: types.SAVE_BILL,
    bill,
  };
};

export const addBillRequest = (newOrder) => {
  return callApi("bills", "POST", {
    products: newOrder.products,
    totalPrice: newOrder.totalPrice,
    nameCustomer: newOrder.nameCustomer,
    id_User: newOrder.id_User,
    coupon: newOrder.coupon,
    address: newOrder.address,
    email: newOrder.email,
    orderNote: newOrder.orderNote,
    paymentMethod: newOrder.paymentMethod,
    phone: newOrder.phone,
  });
};

//add bill success
export const addBillSucess = (isCheck) => {
  return {
    type: types.ADD_BILL_SUCCESS,
    isCheck,
  };
};

//xử lý render list sản phẩm
export const fetchBillsByUser = (bills) => {
  return {
    type: types.FETCH_BILLS_BY_USER,
    bills, //products=products
  };
};

//Lên API lấy dữ liệu products về
export const fetchBillsByUserRequest = (id_User) => {
  return (dispatch) => {
    return callApi(`bills/user/${id_User}`, "GET", null).then((res) => {
      dispatch(fetchBillsByUser(res.data));
    });
  };
};

export const deleteBill = (id_Bill) => {
  return callApi("bills/cancel-bill", "POST", {
    id_Bill: id_Bill,
  });
};

export const changePassword = (id, contentUser) => {
  return callApi(`users/${id}`, "PUT", {
    contentUser,
  });
};

//xử lý render list sản phẩm
export const fetchUserById = (user) => {
  return {
    type: types.FETCH_USER_BY_ID,
    user, //products=products
  };
};

//Lên API lấy dữ liệu products về
export const fetchUserByIdRequest = (id_User) => {
  return (dispatch) => {
    return callApi(`users/${id_User}`, "GET", null).then((res) => {
      dispatch(fetchUserById(res.data));
    });
  };
};
//Thêm sản phẩm
export const changeStatusBill = (bill) => {
  return {
    type: types.CHANGE_STATUS_BILL,
    bill,
  };
};

//Đăng xuất
export const logOut = (id_User) => {
  return {
    type: types.LOG_OUT,
    id_User,
  };
};

// Set jwt token
export const setToken = (token) => {
  return {
    type: types.SET_TOKEN,
    token,
  };
};

// Check is Admin
export const setAdmin = (isAdmin) => {
  return {
    type: types.SET_ADMIN,
    isAdmin,
  };
};

// Check is Admin
export const loginCart = () => {
  return {
    type: types.LOGIN_CART,
  };
};
// Check is Admin
export const logoutCart = () => {
  return {
    type: types.LOGOUT_CART,
  };
};
export const getUserLogin = (user) => {
  return {
    type: types.LOGIN_USER,
    user,
  };
};

export const changeCartInDTB = (cart) => {
  return callApi(`carts/create`, "post", {
    id_User: cart.id_User,
    products: cart.products,
  });
};

export const fetchIdUserInOrder = (id_User) => {
  return {
    type: types.FETCH_ID_USER_IN_ORDER,
    id_User,
  };
};

export const getCart = (cart) => {
  return {
    type: types.GET_CART,
    cart,
  };
};

export const fetchCart = (jwt) => {
  return (dispatch) => {
    return callApi("users/me/cart", "GET", null, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const cart = res.data;
        dispatch(getCart(cart));
      });
  };
};

export const addItemToCart = (item, jwt, cb) => {
  return (dispatch) => {
    return callApi("users/me/cart/add-item", "POST", item, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const cart = res.data;
        dispatch(getCart(cart));
        cb();
      });
  };
};

export const removeItemFromCart = (itemId, jwt, cb) => {
  return (dispatch) => {
    return callApi("users/me/cart/remove-item", "POST", { id: itemId }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const cart = res.data;
        dispatch(getCart(cart));
        cb();
      });
  };
};

export const changeItemQuantity = (itemId, quantity, jwt, cb) => {
  return (dispatch) => {
    return callApi("users/me/cart/change-item-quantity", "POST", { id: itemId, quantity }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const cart = res.data;
        dispatch(getCart(cart));
        cb();
      });
  };
};

export const changeItemSize = (itemId, size, jwt, cb) => {
  return (dispatch) => {
    return callApi("users/me/cart/change-item-size", "POST", { id: itemId, size }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const cart = res.data;
        dispatch(getCart(cart));
        cb();
      });
  };
};

export const applyCoupon = (cart, code, jwt) => {
  return (dispatch) => {
    return callApi("users/me/cart/apply-coupon", "POST", { code }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const newCart = res.data;
        dispatch(getCart(newCart));
      })
      .catch((error) => {
        // const { data } = error.response.data;
        cart.invalidCoupon = 'INVALID_CODE';
        dispatch(getCart(JSON.parse(JSON.stringify(cart))));
      });
  };
};

export const removeCoupon = (jwt) => {
  return (dispatch) => {
    return callApi("users/me/cart/remove-coupon", "GET", null, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        const cart = res.data;
        dispatch(getCart(cart));
      });
  };
};

