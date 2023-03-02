import * as types from "./Constants";
import axios from "./../../Configs/Axios";

export const setUser = (auth) => {
  return {
    type: types.SET_USER,
    auth
  };
};

export const login = (email, password, remember, onError = () => {} ) => {
  return async (dispatch) => {
    try {
      const { jwt, user } = await axios.post("/users/auth/local", { 
        email,
        password
      });
      localStorage.setItem("token", jwt);
      if (!remember) {
        window.addEventListener("beforeunload", function (e) {
          this.localStorage.removeItem("token");
        });
      }

      dispatch(setUser({ user, jwt, isLoggedIn: true }));
    } catch (error) {
      if (typeof onError === "function") {
        onError(error);
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: types.SET_USER,
    auth: {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        addresses: [],
        joinDate: "",
        role: {},
        isConfirmed: false,
        id: ""
      },
      jwt: localStorage.getItem("token"),
      isLoggedIn: false
    }
  };
};

export const me = () => {
  return async (dispatch, getState) => {
    try {
      const { jwt } = getState().auth;
      const user = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch(setUser({ user, isLoggedIn: true, isLoading: false }));
    } catch (error) {
      console.log(error);
      dispatch(setUser({ isLoggedIn: false, isLoading: false }));
    }
  };
};

export const forgetPassword = async (email, onSuccess = () => {}, onError = () => {} ) => {
  try {
    const result = await axios.post("/users/auth/forget-password", { email });
    if (!result) {
      throw new Error("Failed");
    }

    if (typeof onSuccess === "function") {
      onSuccess();
    }

  } catch (error) {
    if (typeof onError === "function") {
      onError(error);
    }
  }
};

export const resetPassword = (newPassword, confirmPassword, code, onError = () => {} ) => {
  return async (dispatch) => {
    try {
      const { jwt, user } = await axios.post("/users/auth/reset-password", { 
        newPassword,
        confirmPassword,
        code,
      });
      localStorage.setItem("token", jwt);

      dispatch(setUser({ user, jwt, isLoggedIn: true }));
    } catch (error) {
      if (typeof onError === "function") {
        onError(error);
      }
    }
  };
};
