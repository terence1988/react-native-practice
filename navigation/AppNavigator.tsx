import React from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Expected error, missing babel plugin
import { Platform } from "react-native";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProduct";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "lightblue" : "green",
};

const ProductNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Product OverView">
      <Stack.Screen
        name="Product OverView"
        component={ProductOverviewScreen}
        options={({ navigation, route }) => {
          //Yeah, it doesn't seem to have the toggleDrawer function cause it's in a STACK
          return {
            ...defaultNavOptions,
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title={"Menu"}
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
              </HeaderButtons>
            ),
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
          };
        }}
      />
      <Stack.Screen
        name="Product Details"
        options={({ navigation, route }) => {
          
          return {
            //@ts-expect-error
            title: route?.params?.productTitle,
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
          };
        }}
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  //Use this DrawerNavigator as the main navigator
  return (
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => {
          return {
            ...defaultNavOptions,
            drawerIcon: (drawerConfig) => {
              return (
                <Ionicons
                  name={Platform.OS === "android" ? "md-list" : "ios-list"}
                  size={23}
                  color={drawerConfig.focused ? "green" : "lightblue"}
                />
              );
            },
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title={"Menu"}
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Drawer.Screen
        name="Products"
        component={ProductNavigator}
        options={(props: any) => {
          return {
            headerShown: false,
            drawerIcon: (drawerConfig) => {
              return (
                <Ionicons
                  name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  size={23}
                  color={drawerConfig.focused ? "green" : "lightblue"}
                />
              );
            },
          };
        }}
      />
      <Drawer.Screen 
        name="Admin"
        component={UserProductScreen}
      
      />
    </Drawer.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
