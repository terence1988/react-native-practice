import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Route, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const PlaceDetailScreen = () => {
  const navigation = useNavigation(); // doesn't have to use hook unless you want to use it
  const route = useRoute();
  useEffect(() => {
    navigation.setOptions({
      //@ts-expect-error -- Just hard to type this for now
      title: route?.params?.placeTitle,
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Text>PlaceDetailScreen</Text>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
