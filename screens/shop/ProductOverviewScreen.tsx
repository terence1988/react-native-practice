import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import ProductItem from "../../components/ProductItem";

const ProductOverviewScreen = (props: any) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );
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
          onViewDetail={() => {
            props.navigation.navigate("Product Details", {
              productId: itemData.item.id,
              productTitle:itemData.item.title
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverviewScreen.options = {
  headerTitle: "All Products",
};

export default ProductOverviewScreen;
