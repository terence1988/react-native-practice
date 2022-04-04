import React from "react";
import { FlatList, Text, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as productActions from "../../store/actions/products";

const UserProductScreen = (props: any) => {
  const userProducts = useSelector((state: any) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  const editProductHandler = (productId: string) => {
    props.navigation.navigate("Edit Product", { productId });
  };

  if (!userProducts || userProducts.length === 0) {
    return <Text>No products found</Text>;
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {}}
          >
            <Button
              title="Edit"
              onPress={() => editProductHandler(itemData.item.id)}
            />
            <Button
              title="Delete"
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </ProductItem>
        );
      }}
    />
  );
};

export default UserProductScreen;
