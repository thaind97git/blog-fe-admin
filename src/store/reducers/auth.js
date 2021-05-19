import { LOGIN, SET_AUTHENTICATED, SET_CURRENT_USER } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action || {};

  switch (type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: payload };

    case SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case LOGIN:
      return { ...state, currentUser: payload, isAuthenticated: true };

    default:
      return { ...state };
  }
};
