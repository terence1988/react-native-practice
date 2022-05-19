import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import PlaceItem from "../../components/PlaceItem";
import * as placeActions from "../../store/actions/places";

const PlaceListScreen = ({ navigation }: any) => {
  const places = useSelector((state: RootState) => state.places.places);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(placeActions.loadPlaces());
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {places.length > 0 ? (
          <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlaceItem
                title={item.title}
                address={item.address}
                imageUri={item.imageUri}
                onSelect={() => {
                  navigation.navigate("Place Details", {
                    placeTitle: item.title,
                    placeId: item.id,
                  });
                }}
              />
            )}
          />
        ) : (
          <Text>Enter some more places.</Text>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    width: "100%",
    height: "100%",
  }
});

export default PlaceListScreen;
