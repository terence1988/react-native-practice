import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
//class can be used as interface and the actual data is handled by contructors

import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

interface ProductInitialState {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: ProductInitialState = {
  availableProducts: [], // stocks
  userProducts: [], //selected products
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case CREATE_PRODUCT:
      const product = new Product(
        action.productData.productId,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        Number(action.productData.price)
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(product),
        userProducts: state.userProducts.concat(product),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[productIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ), // leave only the products that are not the one we want to delete
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
