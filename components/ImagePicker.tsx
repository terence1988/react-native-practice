import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "./UI/Button";
import * as ExpoImagePicker from "expo-image-picker";

interface IImagePickerProps {
  image: ExpoImagePicker.ImageInfo | undefined;
  onSelectImage: (image: ExpoImagePicker.ImageInfo) => void;
}

const ImagePicker = ({ onSelectImage, image }: IImagePickerProps) => {
  const takeImageHandler = async () => {
    const selectedImage = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    //console.log(selectedImage);
    onSelectImage(selectedImage as ExpoImagePicker.ImageInfo);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? <Text style={styles.imageTip}>Pick An Image</Text> : null}
        {image ? (
          <Image style={styles.image} source={{ uri: image.uri }} />
        ) : null}
      </View>
      <Button
        title={`Take Image`}
        onPress={takeImageHandler}
        style={{
          button: {
            backgroundColor: "orange",
            marginHorizontal: 20,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    justifyContent: "center",
  },
  imageTip: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
