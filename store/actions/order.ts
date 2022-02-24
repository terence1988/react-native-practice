export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems: any, totalAmount:number) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItems,
    amout: totalAmount,
  },
});