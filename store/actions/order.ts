import { realTimeDB } from "../../constants";
import Order from "../../models/order";
import Product from "../../models/product";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems: Product[], totalAmount: number) => {
  return async (reduxThunkDispatch: Function) => {
    const dateData = new Date(); // async could have mismatch in date
    const response = await (
      await fetch(`${realTimeDB}/orders/u1.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
        }),
      })
    ).json();
    reduxThunkDispatch({
      type: ADD_ORDER,
      orderData: {
        id: response.name,
        items: cartItems,
        amount: totalAmount,
      },
    });
  };
};

export const fetchOrders = () => {
  return async (reduxThunkDispatch: Function) => {
    const resData = await (await fetch(`${realTimeDB}/orders/u1.json`)).json();
    let loadedOrders = [];
    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].items,
          resData[key].amount,
          new Date(resData[key].createdAt)
        )
      );
    }
    reduxThunkDispatch({
      type: SET_ORDERS,
      orders: [],
    });
  };
};
