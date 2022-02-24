import { ADD_ORDER } from "../actions/order";
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
        Date.now().toString(),
        action.orderData.items,
        action.orderData.amount,
        Date.now().toString()
      );
      return {
        ...state,
        // return new array of orders -- spread operator can be used to add new order to existing array as well
        orders: state.orders.concat(newOrder),
      };
    default:
      return { ...state };
  }
};
