import {
  ADD_TO_CART,
  addToCart,
  REMOVE_FROM_CART,
  removeFromCart,
} from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/order";

const initialState: {
  items: any;
  totalAmount: number;
} = {
  items: {},
  totalAmount: 0,
};

export default (
  state = initialState,
  action: { type: string; product?: any; pid?: string }
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          (state.items[addedProduct.id].quantity + 1) * prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid!];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // reduce the quantity of the item
        const updatedCartItem = {
          ...selectedCartItem,
          quantity: selectedCartItem.quantity - 1,
          totalAmount:
            selectedCartItem.totalAmount - selectedCartItem.productPrice,
        };
        updatedCartItems = { ...state.items, [action.pid!]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid!];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return { ...initialState };
    // case CLEAR_CART:
    //   return initialState;
    default:
      return { ...state };
  }
};
