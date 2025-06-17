import { FC, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  fetchFeeds,
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError
} from '../../services/slices/feedSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки заказов: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
