import reducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('Тест ingredientsSlice', () => {
  it('должен обработать fetchIngredients.pending', () => {
    const initialState = { items: [], isLoading: false, error: null };
    const action = { type: fetchIngredients.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('должен обработать fetchIngredients.fulfilled', () => {
    const initialState = { items: [], isLoading: true, error: null };
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.items).toEqual(mockIngredients);
  });

  it('должен обработать fetchIngredients.rejected', () => {
    const initialState = { items: [], isLoading: true, error: null };
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Failed to fetch ingredients' }
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Failed to fetch ingredients');
  });
});
