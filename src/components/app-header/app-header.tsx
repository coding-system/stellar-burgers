import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  // Заглушка для userName, так как Redux ещё не настроен
  const userName = ''; // Будет браться из state.user позже
  return <AppHeaderUI userName={userName} />;
};
