import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../models/product";
import * as productActions from "../../store/actions/products";

export interface IFormProps {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

const EditProductScreen = (props: any) => {
  // The headers can not be configured across the stacks
  // Maybe it was the older version of navigation that registered most stuff on the same level
  let selectedProduct;
  let selectedProductId: string;

  if (props?.route?.params?.hasOwnProperty("productId")) {
    selectedProductId = props.route.params["productId"];
    if (selectedProductId) {
      const products = useSelector((state: any) => state.products.userProducts);
      selectedProduct = products.find(
        (p: Product) => p.id === selectedProductId
      );
    }
  }
  const dispatch = useDispatch();

  // here is a data mismatch -- how to?
  const [formProps, setFormProps] = useState<IFormProps>({
    title: selectedProduct?.title ?? "",
    price: selectedProduct?.price ?? "",
    imageUrl: selectedProduct?.imageUrl ?? "",
    description: selectedProduct?.description ?? "",
  }); // a-z order of keys will be used automatically

  // useEffect(() => {
  //   console.clear();
  //   console.log(formProps);
  // }, [formProps]);

  const onChange = (type: string, value: string) => {
    setFormProps({
      ...formProps,
      [type]: value,
    });
  };
  //In theory, this will reduce some memory usage -- Doesn't work for onchange
  // const handleOnChange = useCallback(
  //   (type: string, value: string | number) => {
  //     onChange(type, value);
  //   },
  //   [onChange, formProps]
  // );

  const onSubmit = () => {
    // console.log(formProps,"Submitted");
    if (selectedProductId) {
      dispatch(productActions.updateProduct(selectedProductId, formProps));
    } else {
      dispatch(productActions.createProduct(formProps));
    }
    // no navigation here, so it's the same page without notice -- Added
  };

  const handleOnSubmit = useCallback(() => {
    onSubmit();
    props.navigation.navigate("User Product");
  }, [onSubmit]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={formProps.title}
            style={styles.input}
            onChangeText={(value: string) => onChange("title", value)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            value={String(formProps.price)}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value: string) => onChange("price", value)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            value={formProps.imageUrl}
            style={styles.input}
            onChangeText={(value: string) => onChange("imageUrl", value)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={formProps.description}
            style={styles.input}
            onChangeText={(value: string) =>
              onChange("description", value)
            }
          />
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.buttons} onPress={handleOnSubmit}>
          <Text style={styles.buttontext}>Save</Text>
        </Pressable>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Text style={styles.buttontext}>Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
// pressable is a new component for addign styles to a button
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  actions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttons: {
    marginHorizontal: 30,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    opacity: 0.7,
  },
  buttontext: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "white",
  },
});
//React Native's <Button /> component does not accept a style prop

export default EditProductScreen;
