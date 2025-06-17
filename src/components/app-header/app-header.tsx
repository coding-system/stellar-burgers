import { FC } from 'react';
// import { useSelector } from 'react-redux';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return <AppHeaderUI userName={user?.name} />;
};
