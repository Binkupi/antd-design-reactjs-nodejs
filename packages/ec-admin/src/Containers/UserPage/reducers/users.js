import * as types from '../Constants';

const initialState = {
    results: [],
    pagination: {
        page: 1,
        pageSize: 100,
        pageCount: 1,
        total: 0
    }
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return action.page;

    default:
      return state;
  }
};

export default usersReducer;
