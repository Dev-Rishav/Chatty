import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { logoutUser } from './actions/authActions';
import { useNavigate } from 'react-router-dom';

const AuthStatus: React.FC = () => {
  const { isAuthenticated, userDTO } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth', { replace: true });
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <span>Welcome, {userDTO?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <span>Please log in</span>
      )}
    </div>
  );
};

export default AuthStatus;
