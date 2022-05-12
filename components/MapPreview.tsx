import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { GoogleAPIKey } from "../constants";

interface MapPreviewProps {
  location: { lat: number; lng: number };
  [key: string]: any;
}

const MapPreview = (props: MapPreviewProps) => {
  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${GoogleAPIKey}`;

  return (
    <View>
      <Image
        style={{ ...props.style, ...styles.mapImage }}
        source={{ uri: mapImageUrl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
});
// Image must have width and height set

export default MapPreview;
