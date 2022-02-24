import React, { useState, useEffect } from "react";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { composeWithDevTools } from "redux-devtools-extension";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import AppNavigation from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store: Store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchFonts = () => {
        return Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      };
      await fetchFonts();
      setFontLoaded(true);
    })();
  }, []);

  if (!fontLoaded) return <AppLoading />;

  if (fontLoaded)
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
