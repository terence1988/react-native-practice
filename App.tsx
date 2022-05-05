import React, { useState, useEffect } from "react";
import { combineReducers, Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import placesReducer from "./store/reducers/places";
import AppNavigation from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
  places: placesReducer,
});

const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// This serializableCheck causes errors in the app. Not sure why it's even used
// Avoid putting non-serializable values such as Promises, Symbols,
// Maps/Sets, functions, or class instances into
// the Redux store state or dispatched actions.
// This ensures that capabilities such as debugging via the Redux DevTools
// will work as expected. It also ensures that the UI will update as expected.
// probably the JSON.stringify()

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
// EAS Build is a hosted service for building app binaries for your Expo and React Native projects.

// It's actually like a side-loader app that you can install
