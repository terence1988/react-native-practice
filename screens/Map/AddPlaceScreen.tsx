import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/UI/Button";
import * as placeActions from "../../store/actions/places";
import { useNavigation } from "@react-navigation/native";

const AddPlaceScreen = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const titleOnChangeHandler = (val: string) => {
    setTitle(val);
  };

  const savePlaceHandler = () => {
    dispatch(placeActions.addPlace(title));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInnput}
          value={title}
          onChangeText={titleOnChangeHandler}
        />
      </View>
      <Button
        title={`Save Place`}
        onPress={savePlaceHandler}
        style={{ button: { backgroundColor: "orange", marginHorizontal: 20 } }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInnput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default AddPlaceScreen;