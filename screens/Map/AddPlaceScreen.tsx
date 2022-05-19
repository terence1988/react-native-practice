import React, { useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/UI/Button";
import * as placeActions from "../../store/actions/places";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";
import { ImageInfo } from "expo-image-picker";

const AddPlaceScreen = (props: any) => {
  const [title, setTitle] = useState("");
  const [rawImage, setRawImage] = useState<ImageInfo | undefined>();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const titleOnChangeHandler = (value: string) => {
    setTitle(value);
  };

  const imageHandler = (image: ImageInfo) => {
    setRawImage(image);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(placeActions.addPlace(title, rawImage?.uri));
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
      <ImagePicker onSelectImage={imageHandler} image={rawImage} />
      <LocationPicker
        navigation={navigation}
        onLocationPicked={locationPickedHandler}
      />
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
