import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import CartItem from "../../components/CartItem";
import * as cartAction from "../../store/actions/cart";
import * as ordersAction from "../../store/actions/order";

const CartScreen = () => {
  const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state: any) => {
    const tramsformedCartItems: any[] = [];
    for (const key in state.cart.items) {
      tramsformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return tramsformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.abs(cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator
            size={`large`}
            style={{ flex: 1, justifyContent: `center`, alignItems: `center` }}
          />
        ) : (
          <Button
            color={"red"}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={() => {
              setIsLoading(true);
              dispatch(ordersAction.addOrder(cartItems, cartTotalAmount));
              setTimeout(() => setIsLoading(false), 2000);
            }}
          />
        )}
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => {
            return (
              <CartItem
                quantity={itemData.item.quantity}
                productId={itemData.item.productId}
                title={itemData.item.productTitle}
                sum={itemData.item.sum}
                deletable
                onRemove={() => {
                  dispatch(cartAction.removeFromCart(itemData.item.productId));
                }}
              />
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: "#666",
  },
});

export default CartScreen;
