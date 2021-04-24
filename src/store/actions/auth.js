import { getCurrentUser } from '@/apis/auth';
import { setLoading } from './';
import store, { history } from '@/store';
import { getToken, removeToken } from '@/helpers/local-storage';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOG_OUT = 'LOG_OUT';

export const verifyToken = () => async dispatch => {
  let response;
  if (!getToken()) {
    history.push('/login');
  }
  try {
    dispatch(setCurrentUser(null));
    dispatch(setLoading(true));
    dispatch(setIsAuthenticated(false));

    response = await getCurrentUser();

    dispatch(setLoading(false));
    if (response && response.data) {
      dispatch(setCurrentUser(response.data.user));
      dispatch(setIsAuthenticated(true));
    }
  } catch (error) {
    dispatch(setLoading(false));
    history.push('/login');
  }
};

export const setIsAuthenticated = (isAuthenticated = false) => ({
  type: SET_AUTHENTICATED,
  payload: isAuthenticated,
});

export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: currentUser,
});

export const logout = () => {
  removeToken();
  history.push('/login');
  store.dispatch(setIsAuthenticated(false));
  return {
    type: LOG_OUT,
  };
};
