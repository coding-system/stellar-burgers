import { FC, SyntheticEvent, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { login } from '../../services/slices/auth/authSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const dispatch = useDispatch();
  //   const { loading, error, isAuthenticated } = useSelector(
  //     (state: RootState) => state.auth
  //   );
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  //   if (isAuthenticated) {
  //     const from = location.state?.from?.pathname || '/';
  //     navigate(from, { replace: true });
  //   }

  return (
    <LoginUI
      errorText={auth.error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
