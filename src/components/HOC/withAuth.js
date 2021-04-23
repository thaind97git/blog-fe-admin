import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { verifyToken } from '@/store/actions/auth';
import { getCurrentUser } from '@/store/selectors/auth';

const Empty = () => <div />;

const withAuth = AuthComponent => {
  const AuthenHOC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);

    useEffect(() => {
      dispatch(verifyToken());
    }, [dispatch]);

    return currentUser ? <AuthComponent /> : <Empty />;
  };

  return AuthenHOC;
};

export default withAuth;
