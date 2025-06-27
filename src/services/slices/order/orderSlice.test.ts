import reducer, { createOrder, closeOrderModal } from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
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
};

describe('Тест orderSlice', () => {
  it('должен обработать createOrder.pending', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const action = { type: createOrder.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('должен обработать createOrder.fulfilled', () => {
    const initialState = {
      orderRequest: true,
      orderModalData: null,
      error: null
    };
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  it('должен обработать createOrder.rejected', () => {
    const initialState = {
      orderRequest: true,
      orderModalData: null,
      error: null
    };
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка при создании заказа' }
    };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('Ошибка при создании заказа');
  });

  it('должен обработать closeOrderModal', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: mockOrder,
      error: null
    };
    const action = closeOrderModal();
    const newState = reducer(initialState, action);
    expect(newState.orderModalData).toBe(null);
  });
});
