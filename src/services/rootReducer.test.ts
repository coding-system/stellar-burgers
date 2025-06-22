import rootReducer from './rootReducer';
import constructorSlice from './slices/constructor/constructorSlice';
import ingredientsSlice from './slices/ingredients/ingredientsSlice';
import feedSlice from './slices/feed/feedSlice';
import orderReducer from './slices/order/orderSlice';
import authSlice from './slices/auth/authSlice';
import userOrdersSlice from './slices/userOrders/userOrdersSlice';

describe('Тесты rootReducer', () => {
  it('должен правильно инициализироваться с начальным состоянием', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      burgerConstructor: constructorSlice(undefined, { type: 'unknown' }),
      ingredients: ingredientsSlice(undefined, { type: 'unknown' }),
      feed: feedSlice(undefined, { type: 'unknown' }),
      order: orderReducer(undefined, { type: 'unknown' }),
      auth: authSlice(undefined, { type: 'unknown' }),
      userOrders: userOrdersSlice(undefined, { type: 'unknown' })
    });
  });
});
