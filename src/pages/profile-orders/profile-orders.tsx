import { FC, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import {
  fetchUserOrders,
  selectUserOrders
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
