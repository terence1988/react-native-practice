import React, { EventHandler } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface IPlaceItemProps {
  title: string;
  address: string;
  imageUri: string;
  onSelect: EventHandler<any>;
}

const PlaceItem = (props: IPlaceItemProps) => {

  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      {props.imageUri ? (
        <Image style={styles.image} source={{ uri: props.imageUri }} />
      ) : null}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {props.address ? (
          <Text style={styles.address}>{props.address}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "blue",
    borderColor: "pink",
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#666",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});

export default PlaceItem;
