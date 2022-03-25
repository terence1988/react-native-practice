import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";

const UserProductScreen = (props: any) => {
  const userProducts = useSelector((state: any) => state.user.userProducts);

  if (!userProducts || userProducts.length === 0) {
    return <Text>No products found</Text>;
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return <Text>11111+`${itemData.index}`</Text>;
        return (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
          />
        );
      }}
    />
  );
};

export default UserProductScreen;
