import { menuItems } from '../data/db';
import { MenuItem, OrderItem } from '../types';

export type OrderActions =
  | { type: 'add-item'; payload: { item: MenuItem } }
  | { type: 'remove-item'; payload: { id: MenuItem['id'] } }
  | { type: 'define-tip'; payload: { tip: number } }
  | { type: 'place-order' };

export type OrderState = {
  data: MenuItem[];
  order: OrderItem[];
  tip: number;
};

export const initialState: OrderState = {
  data: menuItems,
  order: [],
  tip: 0,
};

export const OrderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  switch (action.type) {
    case 'add-item': {
      const itemExist = state.order.find(
        (orderItem) => orderItem.id === action.payload.item.id
      );

      let updatedOrder: OrderItem[] = [];

      if (itemExist) {
        updatedOrder = state.order.map((orderItem) =>
          orderItem.id === action.payload.item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : { ...orderItem }
        );
      } else {
        const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
        updatedOrder = [...state.order, newItem];
      }

      return {
        ...state,
        order: updatedOrder,
      };
    }
    case 'remove-item': {
      const updatedOrder = state.order.filter(
        (orderItem) => orderItem.id !== action.payload.id
      );
      return {
        ...state,
        order: updatedOrder,
      };
    }
    case 'place-order': {
      return {
        ...state,
        order: [],
        tip: 0,
      };
    }

    case 'define-tip': {
      return {
        ...state,
        tip: action.payload.tip,
      };
    }
    default:
      return state;
  }
};
