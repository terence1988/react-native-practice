import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState: {
  orders: Order[];
} = {
  orders: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        // return new array of orders -- spread operator can be used to add new order to existing array as well
        orders: state.orders.concat(newOrder),
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    default:
      return { ...state };
  }
};
