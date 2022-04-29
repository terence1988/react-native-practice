import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";
import Order from "../../models/order";
import * as orderActions from "../../store/actions/order";

// interface IOrder {
//   date: Date;
//   id: string;
//   items: any; //IProduct[];
//   totalAmount: number;
//   readableDate: () => string;
// }

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(orderActions.fetchOrders());
    setIsLoading(false);
  }, [dispatch]);

  const orders: Order[] = useSelector((state: any) => {
    //console.log(state.orders.orders);
    return state.orders.orders;
  });
  // Array [
  //   Order {
  //     "date": 2022-03-23T03:09:12.335Z,
  //     "id": "1648004952335",
  //     "items": Array [
  //       Object {
  //         "productId": "p5",
  //         "productPrice": 2299.99,
  //         "productTitle": "PowerBook",
  //         "quantity": 2,
  //         "sum": 4599.98,
  //       },
  //     ],
  //     "totalAmount": 4599.98,
  //   },
  // ]
  // Date.toLocaleDateString() is not available on Android RN
  return orders.length > 0 && !isLoading ? (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <OrderItem
            amount={itemData?.item?.totalAmount}
            date={itemData?.item?.readableDate}
            items={itemData?.item?.items}
          />
        );
      }}
    ></FlatList>
  ) : (
    <Text>No orders</Text>
  );
};

export default OrdersScreen;
