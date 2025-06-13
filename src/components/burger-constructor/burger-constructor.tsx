import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { constructorState } from '../../services/slices/constructorSlice';
import { createOrder, closeOrderModal } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(constructorState);
  const constructorItems = items;
  const { orderRequest, orderModalData } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    //  console.log(`Оформляем заказ`);
    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    try {
      const result = await dispatch(createOrder(ingredients)).unwrap();
      // console.log(`Заказ оформлен, номер заказа: ${result.number}`);
    } catch (error) {
      // console.error(`Ошибка при оформлении заказа:, ${error}`);
    }
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
