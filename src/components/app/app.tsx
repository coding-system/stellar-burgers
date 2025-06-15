import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/authSlice';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, IngredientDetails, OrderInfo, Modal } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';

import { useLocation, useNavigate } from 'react-router-dom';
import { fetchFeeds } from '../../services/slices/feedSlice';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeeds());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        {/* <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`${styles.detailHeader} text text_type_main-large`}
              >
                Детали ингридиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`${styles.detailHeader} text text_type_main-large`}
              >
                Детали заказа
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`${styles.detailHeader} text text_type_main-large`}
              >
                Детали заказа
              </p>
              <OrderInfo />
            </div>
          }
        /> */}
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={navigateBack}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали Заказа' onClose={navigateBack}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали Заказа' onClose={navigateBack}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
