import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product OverView">
        <Stack.Screen
          name="Product OverView"
          component={ProductOverviewScreen}
          options={({ navigation, route }) => ({
            headerTitle: "All Products",
            headerTitleStyle: {
              fontFamily: "open-sans-bold",
            },
            headerBackTitleStyle: {
              fontFamily: "open-sans",
            },
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
    </NavigationContainer>
  );
};

export default AppNavigation;
