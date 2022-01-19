import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../App";

const ProductDetailsScreen = (props: any) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find((prod: any) => prod.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.description}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

//you can read the params through route.params inside a screen
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  }, // worth to check demensions api
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: "20"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailsScreen;
