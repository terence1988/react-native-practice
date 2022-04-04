import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../App";
import ProductItem from "../../components/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

const ProductOverviewScreen = (props: any) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        dispatch(productActions.fetchProducts());
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleViewDetails = (productId: string, productTitle: string) => {
    props.navigation.navigate("Product Details", {
      productId,
      productTitle,
    });
  };
  if (isLoading) {
    return (
      <View style={styles.centeredComponent}>
        <ActivityIndicator size={`large`} color={`grey`} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centeredComponent}>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      //itemData -s the default RN obj which has item property but it does not know further
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            handleViewDetails(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            title="View Details"
            onPress={() =>
              handleViewDetails(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            title="Add to Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};
const styles = StyleSheet.create({
  centeredComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
