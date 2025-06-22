import rootReducer from './rootReducer';

import constructorSlice from './slices/constructor/constructorSlice';
import ingredientsSlice from './slices/ingredients/ingredientsSlice';
import feedSlice from './slices/feed/feedSlice';
import orderReducer from './slices/order/orderSlice';
import authSlice from './slices/auth/authSlice';
import userOrdersSlice from './slices/userOrders/userOrdersSlice';

describe('rootReducer', () => {
  it('должен правильно инициализироваться с начальным состоянием', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      burgerConstructor: constructorSlice(undefined, initAction),
      ingredients: ingredientsSlice(undefined, initAction),
      feed: feedSlice(undefined, initAction),
      order: orderReducer(undefined, initAction),
      auth: authSlice(undefined, initAction),
      userOrders: userOrdersSlice(undefined, initAction)
    });
  });
});
