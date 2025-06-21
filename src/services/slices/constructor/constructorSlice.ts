import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

export interface TConstructorData {
  bun: TConstructorIngredient | null; // булка
  ingredients: TConstructorIngredient[]; // массив остальных ингредиентов
}

export const initialState: TConstructorData = {
  bun: null,
  ingredients: []
};

export const burgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Добавление ингредиента в конструктор
    addBurgerItem: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        console.log('Редьюсер вызван с данными:', payload);
        const { type } = payload;
        // Если булка, заменяем существующую
        // Если ингредиент, добавляем в конец списка ингредиентов
        if (type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        console.log('Prepare вызван с ингредиентом:', ingredient);
        const id = uuid();
        console.log('Сгенерированный id:', id);
        const payload: TConstructorIngredient = {
          ...ingredient,
          id
        };
        console.log('Подготовленные данные:', payload);
        return { payload };
      }
    },
    // Удаление ингредиента по индексу
    removeBurgerItem: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    // Перемещение ингредиента вверх
    moveBurgerItemUp: (state, { payload }: PayloadAction<number>) => {
      if (payload > 0) {
        const ingredients = [...state.ingredients];
        const [movedItem] = ingredients.splice(payload, 1);
        ingredients.splice(payload - 1, 0, movedItem);
        state.ingredients = ingredients;
      }
    },
    // Перемещение ингредиента вниз
    moveBurgerItemDown: (state, { payload }: PayloadAction<number>) => {
      if (payload < state.ingredients.length - 1) {
        const ingredients = [...state.ingredients];
        const [movedItem] = ingredients.splice(payload, 1);
        ingredients.splice(payload + 1, 0, movedItem);
        state.ingredients = ingredients;
      }
    },
    // Сброс конструктора - очищаем все ингредиенты
    resetConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    constructorState: (state) => state
  }
});

export const {
  addBurgerItem,
  removeBurgerItem,
  resetConstructor,
  moveBurgerItemUp,
  moveBurgerItemDown
} = burgerSlice.actions;

export const { constructorState } = burgerSlice.selectors;

export default burgerSlice.reducer;
