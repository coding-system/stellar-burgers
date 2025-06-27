import reducer, {
  fetchUserOrders,
  setOrders,
  addOrder
} from './userOrdersSlice';
import { TOrder } from '../../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '685938fb943eac001cc3b83c',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
    createdAt: '2025-06-23T11:22:35.974Z',
    updatedAt: '2025-06-23T11:22:37.132Z',
    number: 82415
  },
  {
    _id: '6859577f943eac001cc3b8a1',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2025-06-23T13:32:47.594Z',
    updatedAt: '2025-06-23T13:32:48.357Z',
    number: 82425
  }
];

describe('Тест userOrdersSlice', () => {
  it('должен обработать fetchUserOrders.pending', () => {
    const initialState = { orders: [], loading: false, error: null };
    const action = { type: fetchUserOrders.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('должен обработать fetchUserOrders.fulfilled', () => {
    const initialState = { orders: [], loading: true, error: null };
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const newState = reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
  });

  it('должен обработать fetchUserOrders.rejected', () => {
    const initialState = { orders: [], loading: true, error: null };
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Ошибка загрузки заказов' }
    };
    const newState = reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки заказов');
  });

  it('должен обработать setOrders', () => {
    const initialState = { orders: [], loading: false, error: null };
    const action = setOrders(mockOrders);
    const newState = reducer(initialState, action);
    expect(newState.orders).toEqual(mockOrders);
  });

  it('должен обработать addOrder', () => {
    const initialState = {
      orders: [mockOrders[0]],
      loading: false,
      error: null
    };
    const newOrder = mockOrders[1];
    const action = addOrder(newOrder);
    const newState = reducer(initialState, action);
    expect(newState.orders).toHaveLength(2);
    expect(newState.orders[0]).toEqual(newOrder);
    expect(newState.orders[1]).toEqual(mockOrders[0]);
  });
});
