import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import MapPreview from "./MapPreview";
import * as Location from "expo-location";

type ILocation = {
  lat: number;
  lng: number;
};

const LocationPicker = () => {
  const [location, setLocation] = useState<ILocation>();
  const [loading, setLoading] = useState(false);

  const getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to access location");
      return;
    }
    try {
      setLoading(true);
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
      // Object {
      //   "coords": Object {
      //     "accuracy": 600,
      //     "altitude": 0,
      //     "altitudeAccuracy": 0,
      //     "heading": 0,
      //     "latitude": 37.4220936,
      //     "longitude": -122.083922,
      //     "speed": 0,
      //   },
      //   "mocked": false,
      //   "timestamp": 1652313908546,
      // }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <Text>LocationPicker</Text>
      {!loading ? (
        <View style={styles.previewMap}>
          {location && Object.keys(location as ILocation).length > 0 ? (
            <MapPreview location={location} />
          ) : (
            <Text>No location picked yet!</Text>
          )}
        </View>
      ) : (
        <ActivityIndicator size={`large`} color={`#555`} />
      )}
      <Button
        color={`lightblue`}
        title="Get Location"
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 16,
  },
  previewMap: {
    padding: 10,
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "grey",
    borderWidth: 1,
  },
});

export default LocationPicker;
