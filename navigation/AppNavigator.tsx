import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Expected error, missing babel plugin
import { Platform } from "react-native";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerTitle: "All Products",
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "red" : "green",
};

const ProductNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Product OverView">
      <Stack.Screen
        name="Product OverView"
        component={ProductOverviewScreen}
        options={({ navigation, route }) => ({
          ...defaultNavOptions,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title={"Cart"}
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Product Details"
        options={({ route }) => {
          //@ts-expect-error
          return { title: route?.params?.productTitle };
        }}
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Drawer.Screen
      name="Orders"
      component={OrdersScreen}
      options={({ navigation, route }) => {
        return {
          ...defaultNavOptions,
          headerTitle: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        };
      }}
    />
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <ProductNavigator />
      <OrdersNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
