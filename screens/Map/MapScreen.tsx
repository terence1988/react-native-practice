import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import PlaceItem from "../../components/PlaceItem";
import * as placeActions from "../../store/actions/places";

const ShowMapScreen = ({ navigation }: any) => {
  const places = useSelector((state: RootState) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(placeActions.loadPlaces());
  }, []);
  console.log(places);
  return (
    <View>
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
  );
};

const styles = StyleSheet.create({});

export default ShowMapScreen;
