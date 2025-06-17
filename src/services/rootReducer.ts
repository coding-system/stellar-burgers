import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import authReducer from './slices/authSlice';
import { orderReducer } from './slices/orderSlice';
import userOrdersReducer from './slices/userOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  auth: authReducer,
  order: orderReducer,
  userOrders: userOrdersReducer
});

export default rootReducer;
