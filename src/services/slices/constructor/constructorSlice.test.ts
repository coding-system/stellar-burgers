import { burgerSlice, initialState } from './constructorSlice';
import { TIngredient } from '@utils-types';

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
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

describe('constructorSlice', () => {
  it('должен вернуть начальное состояние', () => {
    expect(burgerSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addBurgerItem', () => {
    it('должен добавить булку', () => {
      const action = burgerSlice.actions.addBurgerItem(mockIngredients[0]);
      const newState = burgerSlice.reducer(initialState, action);

      expect(newState.bun).toEqual({
        ...mockIngredients[0],
        id: expect.any(String)
      });
      expect(newState.ingredients).toEqual([]);
    });

    it('должен заменить существующую булку', () => {
      const firstBun = { ...mockIngredients[0], id: 'bun-1' };
      const stateWithBun = { ...initialState, bun: firstBun };

      const action = burgerSlice.actions.addBurgerItem(mockIngredients[1]);
      const newState = burgerSlice.reducer(stateWithBun, action);

      expect(newState.bun).toEqual({
        ...mockIngredients[1],
        id: expect.any(String)
      });
      expect(newState.bun?.id).not.toBe('bun-1');
    });

    it('должен добавить ингредиент в конец списка', () => {
      const action = burgerSlice.actions.addBurgerItem(mockIngredients[2]);
      const newState = burgerSlice.reducer(initialState, action);

      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual({
        ...mockIngredients[2],
        id: expect.any(String)
      });
    });
  });

  describe('Тест removeBurgerItem', () => {
    it('должен удалить ингредиент по индексу', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredients[2], id: 'main-1' },
          { ...mockIngredients[3], id: 'main-2' },
          { ...mockIngredients[3], id: 'main-3' }
        ]
      };

      const action = burgerSlice.actions.removeBurgerItem(1);
      const newState = burgerSlice.reducer(stateWithIngredients, action);

      expect(newState.ingredients).toHaveLength(2);
      expect(newState.ingredients[0].id).toBe('main-1');
      expect(newState.ingredients[1].id).toBe('main-3');
    });
  });

  describe('Тест moveBurgerItemUp', () => {
    it('должен переместить ингредиент вверх', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredients[2], id: 'main-1' },
          { ...mockIngredients[3], id: 'main-2' },
          { ...mockIngredients[3], id: 'main-3' }
        ]
      };

      const action = burgerSlice.actions.moveBurgerItemUp(2);
      const newState = burgerSlice.reducer(stateWithIngredients, action);

      expect(newState.ingredients).toHaveLength(3);
      expect(newState.ingredients[0].id).toBe('main-1');
      expect(newState.ingredients[1].id).toBe('main-3');
      expect(newState.ingredients[2].id).toBe('main-2');
    });
  });

  describe('Тест moveBurgerItemDown', () => {
    it('должен переместить ингредиент вниз', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredients[2], id: 'main-1' },
          { ...mockIngredients[3], id: 'main-2' },
          { ...mockIngredients[3], id: 'main-3' }
        ]
      };

      const action = burgerSlice.actions.moveBurgerItemDown(0);
      const newState = burgerSlice.reducer(stateWithIngredients, action);

      expect(newState.ingredients).toHaveLength(3);
      expect(newState.ingredients[0].id).toBe('main-2');
      expect(newState.ingredients[1].id).toBe('main-1');
      expect(newState.ingredients[2].id).toBe('main-3');
    });
  });
});
