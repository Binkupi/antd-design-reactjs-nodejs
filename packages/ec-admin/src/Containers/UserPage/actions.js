import * as types from './Constants';
import axios from './../../Configs/Axios';
import qs from "qs";

export const setUsers = (page) => {
  return {
    type: types.SET_USERS,
    page,
  };
};

export const fetchUsers = (queryParams = {}, page = 1, pageSize = 100) => {
  return async (dispatch) => {
    const query = qs.stringify({
      ...queryParams,
      page,
      pageSize,
    });
    const { results, pagination } = await axios.get(`/users?${query}`);
    dispatch(setUsers({ results, pagination }));
  };
};

export const fetchUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get(`/users/${id}`);
      resolve(data);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const updateUserById = (id, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await axios.put(`/users/${id}`, params);
      resolve(user);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const fetchRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get('/roles');
      resolve(data.results);
    } catch (e) {
      reject(e.response);
    }
  });
};
