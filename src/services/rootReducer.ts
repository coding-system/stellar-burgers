import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients/ingredientsSlice';
import constructorReducer from './slices/constructor/constructorSlice';
import feedReducer from './slices/feed/feedSlice';
import authReducer from './slices/auth/authSlice';
import { orderReducer } from './slices/order/orderSlice';
import userOrdersReducer from './slices/userOrders/userOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  auth: authReducer,
  order: orderReducer,
  userOrders: userOrdersReducer
});

export default rootReducer;
