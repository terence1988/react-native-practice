import React, { useState } from "react";
import MapView, { Region, MapEvent, Marker, LatLng } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

const MapPicker = () => {
  const [markerLocation, setMarkerLocation] = useState<LatLng>();
  const mapRegionProps: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (e: MapEvent) => {
    //console.log(e.nativeEvent.coordinate);
    //e.nativeEvent.coordinate
    // Object {
    //   "latitude": 37.78654034409991,
    //   "longitude": -122.4029916152358,
    // }
    setMarkerLocation(e.nativeEvent.coordinate);
  };
  return (
    <MapView
      initialRegion={mapRegionProps}
      style={styles.mapView}
      onPress={selectLocationHandler}
    >
      {markerLocation?.latitude ? (
        <Marker
          coordinate={markerLocation}
          title="My Marker"
          description="This is a marker"
        />
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapPicker;
