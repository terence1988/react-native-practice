import { realTimeDB } from "../../constants";
import Order from "../../models/order";
import Product from "../../models/product";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems: Product[], totalAmount: number) => {
  return async (reduxThunkDispatch: Function, getState: Function) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const dateData = new Date(); // async could have mismatch in date
    const response = await (
      await fetch(`${realTimeDB}/orders/${userId}.json?auth=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: dateData.toISOString(),
        }),
      })
    ).json();
    reduxThunkDispatch({
      type: ADD_ORDER,
      orderData: {
        id: response.name,
        items: cartItems,
        amount: totalAmount,
        date: dateData.toISOString(),
      },
    });
  };
};

export const fetchOrders = () => {
  return async (reduxThunkDispatch: Function, getState: Function) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    const resData = await (
      await fetch(`${realTimeDB}/orders/${userId}.json`)
    ).json();
    //console.log("Order resdata",resData[userId]) // -- aok here somewhere was wrong  but whatever

    let loadedOrders = [];

    for (const key in resData) {
      // console.log("key", resData[key].cartItems);
      loadedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
      );
    }
    console.dir("loadedOrders", loadedOrders);
    reduxThunkDispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  };
};
