import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../App";

const ShowMapScreen = () => {
  const places = useSelector((state: RootState) => state.places);

  useEffect(() => {
    console.log(places);
  }, []);

  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowMapScreen;
