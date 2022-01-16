import React from "react";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";

import productsReducer from "./store/reducers/products";
import AppNavigation from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store: Store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//It's actually always any atm
