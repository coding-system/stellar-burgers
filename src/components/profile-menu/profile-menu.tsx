import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { ProfileMenuUI } from '@ui';
import { logout } from '../../services/slices/authSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
