import React from "react";
import { FlatList, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const OrdersScreen = (props: any) => {
  const orders = useSelector((state: any) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.toalAmount}</Text>}
    ></FlatList>
  );
};

export default OrdersScreen;
