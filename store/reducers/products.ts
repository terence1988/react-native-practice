import PRODUCTS from "../../data/dummy-data";

interface ProductInitialState {
  availableProducts: {}[];
  userProducts: {}[];
}

const initialState: ProductInitialState = {
  availableProducts: PRODUCTS, // stocks
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"), //selected products
};

const productsReducer = (state = initialState, action: any) => {
  return state;
};

export default productsReducer;
