import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "./CartItem";

const OrderItem = (props: any) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={`lightgreen`}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(!showDetails)}
      ></Button>
      <View>
        {showDetails
          ? props.items.map((item: any) => {
              return (
                <CartItem
                  key={`item-${item.productId.slice(0,6)}`}
                  title={item.productTitle}
                  quantity={item.quantity}
                  sum={item.sum}
                />
              );
            })
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 14,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
});

export default OrderItem;
