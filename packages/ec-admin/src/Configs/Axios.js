import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  // `withCredentials` chỉ định có thực hiện các request cross-site Access-Control sử dụng credential hay không
  withCredentials: false, // mặc định là false,
  headers: {},
});
axiosClient.interceptors.request.use(
  async (config) => {
    //handle token here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    throw error;
  },
);
axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response && !isNil(response.data)) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle error here
    throw error;
  },
);

const isNil = (data) => {
  if (data === undefined || data === null) {
    return true;
  }

  return false;
}

export default axiosClient;
