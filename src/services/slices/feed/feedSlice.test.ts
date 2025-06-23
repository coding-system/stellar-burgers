import reducer, { fetchFeeds } from './feedSlice';
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
  }
];

describe('Тест feedSlice', () => {
  it('должен обработать fetchFeeds.pending', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    };
    const action = { type: fetchFeeds.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('должен обработать fetchFeeds.fulfilled', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 10000,
        totalToday: 50
      }
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.total).toBe(10000);
    expect(newState.totalToday).toBe(50);
  });

  it('должен обработать fetchFeeds.rejected', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки');
  });
});
