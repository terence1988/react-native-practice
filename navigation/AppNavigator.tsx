import React from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer"; // Expected error, missing babel plugin

import { Platform, View, Text } from "react-native";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";

import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import AddPlaceScreen from "../screens/Map/AddPlaceScreen";
import PlaceListScreen from "../screens/Map/PleaceListScreen";
import PlaceDetailScreen from "../screens/Map/PlaceDetailScreen";
import MapPicker from "../components/MapPicker";

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

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="User Product">
      <Stack.Screen
        name="User Product"
        component={UserProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit Product" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const MapNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Show Map"
      screenOptions={({ navigation, route }) => {
        return {
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Add Place"
                iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                onPress={() => {
                  //console.log("Add Place");
                  navigation.navigate(`Add Place`);
                }}
              />
            </HeaderButtons>
          ),
        };
      }}
    >
      <Stack.Screen
        name="Show Map"
        component={PlaceListScreen}
        options={{ title: "All Places" }}
      />
      <Stack.Screen
        name="Add Place"
        component={AddPlaceScreen}
        options={{ title: "Add new Place" }}
      />
      <Stack.Screen
        name="Place Details"
        component={PlaceDetailScreen}
        options={{ title: "A Place" }}
      />
      <Stack.Screen
        name="Pick a location"
        component={MapPicker}
        options={{ title: "Drop a pin" }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  //Use this DrawerNavigator as the main navigator
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      defaultStatus="closed"
      drawerContent={(props) => {
        // append the item at the bottom of the API-exposed list
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              labelStyle={{
                fontSize: 14,
              }}
              label="Logout"
              icon={({ focused, color, size }) => (
                <Ionicons
                  name={
                    Platform.OS === "android" ? "md-log-out" : "ios-log-out"
                  }
                  size={24}
                  color={focused ? "green" : "lightblue"}
                />
              )}
              onPress={() => {
                dispatch(authActions.logout());
                const { navigation } = props; // if not sure, just destructure it
                navigation.navigate("Auth");
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
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
        component={UserNavigator}
        options={({ navigation, route }) => {
          return {
            drawerIcon: (drawerConfig) => {
              return (
                <Ionicons
                  name={Platform.OS === "android" ? "md-cog" : "ios-cog"}
                  size={23}
                  color={drawerConfig.focused ? "green" : "lightblue"}
                />
              );
            },
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title={"Add"}
                  iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                  onPress={() => {
                    navigation.navigate(`Edit Product`);
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Drawer.Screen
        name="Map"
        component={MapNavigator}
        options={() => {
          return {
            headerShown: false,
            drawerIcon: (drawerConfig) => {
              return (
                <Ionicons
                  name={Platform.OS === "android" ? "md-map" : "ios-map"}
                  size={23}
                  color={drawerConfig.focused ? "green" : "lightblue"}
                />
              );
            },
          };
        }}
      />
    </Drawer.Navigator>
  );
};
// easier to use default closed()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartUp"
      screenOptions={{ headerShown: false }}
      screenListeners={{
        state: (e) => {
          console.log(
            "state changed",
            new Date().toISOString().slice(0, 16),
            e.data
          );
        },
      }}
    >
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="StartUp" component={StartUpScreen} />
    </Stack.Navigator>
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
