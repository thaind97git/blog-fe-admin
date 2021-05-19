import { getCurrentUser } from '@/apis/auth';
import { getToken } from '@/helpers/local-storage';
import { goURL } from '@/helpers/router';
import { useShallowEqualSelector } from '@/hooks/useShallowEqualSelector';
import { login } from '@/store/actions/auth';
import { getIsAuthenticated } from '@/store/selectors/auth';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Auth = ({ children }) => {
  const [renderRoute, setRenderRoute] = useState(false);
  const dispatch = useDispatch();

  const isAuthenticated = useShallowEqualSelector(getIsAuthenticated);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      if (response && response.data) {
        dispatch(login(response.data.user));
      }
    } catch (error) {
      goURL('/login');
    }
    setRenderRoute(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (!getToken()) {
        setRenderRoute(true);
        goURL('/login');
      } else {
        fetchCurrentUser();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return renderRoute ? children : null;
};

export default Auth;
