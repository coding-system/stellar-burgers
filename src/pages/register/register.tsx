import { FC, SyntheticEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { RegisterUI } from '@ui-pages';
import { register } from '../../services/slices/authSlice';
// import { RootState, AppDispatch } from '../../services/store';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch<AppDispatch>();
  //   const { loading, error, isAuthenticated } = useSelector(
  //     (state: RootState) => state.auth
  //   );
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ name: userName, email, password }));
  };

  //   if (isAuthenticated) {
  //     navigate('/');
  //   }

  return (
    <RegisterUI
      errorText={auth.error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
